import DomeGallery from "../ui/DomeGallery";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const assetImages = import.meta.glob("../../assets/images/nefzawa-images/hero-image/*.webp", { eager: true });

export default function HeroNefzawa() {
  const myImages = Object.values(assetImages).map((img) => ({ src: img.default || img }));
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative w-full min-h-[450px] md:h-[750px] h-screen max-h-[750px] bg-[#060010] overflow-hidden m-0 p-0">
      <div className="absolute inset-0 z-0">
        <DomeGallery
          images={myImages}
          fit={isMobile ? 1.8 : 1.1}
          segments={isMobile ? 24 : 40}
          minRadius={isMobile ? 350 : 700}
          grayscale={false}
          overlayBlurColor="#060010"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 bg-[#e00a0a78]">
        <h1 className="text-5xl md:text-8xl font-black text-white mb-4 drop-shadow-[0_10px_20px_rgba(0,0,0,1)] font-arabic">
          NEFZAWA
        </h1>
        <p className="text-lg md:text-2xl text-white font-bold max-w-3xl drop-shadow-lg px-2">
          "is more than a media, it's a hidden treasure"
        </p>
        <Link
          to="/HistoryPage"
          className="mt-8 md:mt-10 px-6 md:px-10 py-2 md:py-4 bg-[#E00A0A] text-white rounded-full font-bold hover:scale-110 active:scale-95 transition-transform shadow-2xl inline-block text-sm md:text-base"
        >
          اكتشف المزيد
        </Link>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-16 md:h-32 bg-gradient-to-t from-white to-transparent z-20"></div>
    </section>
  );
}