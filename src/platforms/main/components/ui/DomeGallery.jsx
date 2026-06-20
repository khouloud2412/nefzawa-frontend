import { useEffect, useMemo, useRef, useCallback } from 'react';
import { useGesture } from '@use-gesture/react';

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const wrapAngleSigned = deg => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};

function buildItems(pool, seg) {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];
  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 }));
  });
  if (!pool || pool.length === 0) return coords.map(c => ({ ...c, src: '' }));
  const normalizedImages = pool.map(img => (typeof img === 'string' ? { src: img } : { src: img.src || '' }));
  const usedImages = Array.from({ length: coords.length }, (_, i) => normalizedImages[i % normalizedImages.length]);
  return coords.map((c, i) => ({ ...c, src: usedImages[i].src }));
}

export default function DomeGallery({
  images = [],
  fit = 0.5,
  minRadius = 600,
  maxRadius = Infinity,
  segments = 35,
  grayscale = false,
  overlayBlurColor = '#060010'
}) {
  const rootRef = useRef(null);
  const sphereRef = useRef(null);
  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const draggingRef = useRef(false);

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const applyTransform = useCallback((xDeg, yDeg) => {
    if (sphereRef.current) {
      sphereRef.current.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    }
  }, []);

  useEffect(() => {
    let rafId;
    const rotate = () => {
      if (!draggingRef.current) {
        rotationRef.current.y = wrapAngleSigned(rotationRef.current.y + 0.06);
        applyTransform(rotationRef.current.x, rotationRef.current.y);
      }
      rafId = requestAnimationFrame(rotate);
    };
    rafId = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(rafId);
  }, [applyTransform]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const updateSize = () => {
      const w = root.clientWidth;
      let radius = clamp(w * fit, minRadius, maxRadius);
      root.style.setProperty('--radius', `${Math.round(radius)}px`);
      applyTransform(rotationRef.current.x, rotationRef.current.y);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [fit, minRadius, maxRadius, applyTransform]);

  useGesture({
    onDragStart: () => { draggingRef.current = true; startRotRef.current = { ...rotationRef.current }; },
    onDrag: ({ offset: [dx, dy], last }) => {
      rotationRef.current.y = startRotRef.current.y + dx / 15;
      rotationRef.current.x = clamp(startRotRef.current.x - dy / 15, -10, 10);
      applyTransform(rotationRef.current.x, rotationRef.current.y);
      if (last) draggingRef.current = false;
    }
  }, { target: rootRef });

  return (
    <div ref={rootRef} className="w-full h-full relative overflow-hidden bg-transparent">
      <style>{`
        .dg-stage { width: 100%; height: 100%; display: grid; place-items: center; perspective: 800px; }
        .dg-sphere { position: absolute; transform-style: preserve-3d; will-change: transform; }
        .dg-item { 
          position: absolute; 
          --item-width: calc((var(--radius) * 3.14) / ${segments}); 
          width: calc(var(--item-width) * 2); 
          height: calc(var(--item-width) * 2); 
          margin-left: calc(var(--item-width) * -1); 
          margin-top: calc(var(--item-width) * -1); 
          transform-style: preserve-3d; backface-visibility: hidden;
          transform: rotateY(calc((360deg / ${segments} / 2) * (var(--offset-x) + 0.5))) 
                     rotateX(calc((360deg / ${segments} / 2) * (var(--offset-y) - 0.5))) 
                     translateZ(var(--radius)); 
        }
        .dg-card { position: absolute; inset: 12px; border-radius: 25px; overflow: hidden; background: #111; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .dg-card img { width: 100%; height: 100%; object-fit: cover; filter: ${grayscale ? 'grayscale(1)' : 'none'}; }
        .dg-mask { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(circle, transparent 40%, ${overlayBlurColor} 100%); }
      `}</style>
      <div className="dg-stage">
        <div ref={sphereRef} className="dg-sphere">
          {items.map((it, i) => (
            <div key={i} className="dg-item" style={{ '--offset-x': it.x, '--offset-y': it.y }}>
              <div className="dg-card"><img src={it.src} alt="" /></div>
            </div>
          ))}
        </div>
        <div className="dg-mask" />
      </div>
    </div>
  );
}