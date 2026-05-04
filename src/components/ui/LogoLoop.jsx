import { useCallback, useEffect, useRef, useState, memo } from 'react';

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2
};

const cx = (...parts) => parts.filter(Boolean).join(' ');

export const LogoLoop = memo(({
  logos,
  speed = 50,
  direction = 'left',
  logoHeight = 100,
  gap = 60, 
  pauseOnHover = true,
  fadeOut = true,
  fadeOutColor = '#ffffff',
  className
}) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const seqRef = useRef(null);
  const [seqWidth, setSeqWidth] = useState(0);
  const [copyCount, setCopyCount] = useState(2);
  const [isHovered, setIsHovered] = useState(false);

  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const lastTimestampRef = useRef(null);

  const updateDimensions = useCallback(() => {
    if (!containerRef.current || !seqRef.current) return;
    
    const containerWidth = containerRef.current.clientWidth;
    const sequenceWidth = seqRef.current.getBoundingClientRect().width;
    
    if (sequenceWidth > 0) {
      setSeqWidth(Math.ceil(sequenceWidth));
      setCopyCount(Math.ceil(containerWidth / sequenceWidth) + 2);
    }
  }, []);

  // --- FIX : On utilise useEffect pour le calcul des dimensions ---
  useEffect(() => {
    // On utilise setTimeout(..., 0) pour dire à React : 
    // "Attends que l'affichage soit fini avant de calculer la taille"
    const timer = setTimeout(() => {
      updateDimensions();
    }, 0);

    window.addEventListener('resize', updateDimensions);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateDimensions);
    };
  }, [updateDimensions, logos]);

  // Boucle d'animation
  useEffect(() => {
    const track = trackRef.current;
    if (!track || seqWidth <= 0) return;

    const animate = timestamp => {
      if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
      const deltaTime = (timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const targetVelocity = direction === 'left' ? speed : -speed;
      const currentTarget = isHovered && pauseOnHover ? 0 : targetVelocity;

      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (currentTarget - velocityRef.current) * easingFactor;

      offsetRef.current = (offsetRef.current + velocityRef.current * deltaTime) % seqWidth;
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      
      requestAnimationFrame(animate);
    };

    const rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [seqWidth, isHovered, speed, direction, pauseOnHover]);

  return (
    <div 
      ref={containerRef} 
      className={cx('relative overflow-hidden w-full py-8', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {fadeOut && (
        <>
          <div className="absolute inset-y-0 left-0 w-24 md:w-48 z-10 pointer-events-none" 
               style={{ background: `linear-gradient(to right, ${fadeOutColor}, transparent)` }} />
          <div className="absolute inset-y-0 right-0 w-24 md:w-48 z-10 pointer-events-none" 
               style={{ background: `linear-gradient(to left, ${fadeOutColor}, transparent)` }} />
        </>
      )}

      <div ref={trackRef} className="flex flex-row w-max items-center">
        {Array.from({ length: copyCount }).map((_, i) => (
          <ul 
            key={i} 
            ref={i === 0 ? seqRef : null} 
            className="flex items-center list-none p-0 m-0"
            style={{ gap: `${gap}px`, paddingRight: `${gap}px` }} // Utilisation de gap ici !
          >
            {logos.map((logo, index) => (
              <li key={index} className="flex-none">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  style={{ height: `${logoHeight}px` }} 
                  className="w-auto object-contain transition-all duration-300 transform hover:scale-125"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
});

LogoLoop.displayName = 'LogoLoop';
export default LogoLoop;