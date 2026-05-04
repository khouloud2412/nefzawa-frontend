import React, { useState,  useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// On ajoute "direction" aux paramètres, avec "rtl" par défaut (car notre site est majoritairement en arabe)
export default function ImageCarousel({ images = [], direction = "rtl" }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (images.length === 0) return null;

  // Logique pour l'animation selon la direction
  // Si LTR (français), l'image suivante vient de la droite (+10)
  // Si RTL (arabe), l'image suivante vient de la gauche (-10)
  const offsetValue = direction === "ltr" ? "translate-x-10" : "-translate-x-10";

  return (
    // On applique dynamiquement l'attribut dir
    <div className="relative w-full max-w-5xl mx-auto" dir={direction}>
      
      <div className="relative overflow-hidden rounded-[2rem] shadow-2xl bg-slate-900 h-[500px] md:h-[750px] border-[1px] border-slate-700">
        
        {/* Fond flou */}
        <div className="absolute inset-0 z-0 opacity-20 blur-3xl scale-110">
          <img src={images[currentIndex].src} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Slides */}
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out flex items-center justify-center p-4 md:p-8 ${
              index === currentIndex 
                ? 'opacity-100 z-10 translate-x-0' 
                : `opacity-0 z-0 ${offsetValue}`
            }`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              loading="eager"
            />
          </div>
        ))}

        {/* FLÈCHES ADAPTATIVES */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 flex justify-between px-4 pointer-events-none">
          {/* Bouton Précédent */}
          <button 
            onClick={prevSlide} 
            className="pointer-events-auto p-4 rounded-2xl bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-[#E00A0A] transition-all"
          >
            {direction === "rtl" ? <ChevronRight size={32} /> : <ChevronLeft size={32} />}
          </button>

          {/* Bouton Suivant */}
          <button 
            onClick={nextSlide} 
            className="pointer-events-auto p-4 rounded-2xl bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-[#E00A0A] transition-all"
          >
            {direction === "rtl" ? <ChevronLeft size={32} /> : <ChevronRight size={32} />}
          </button>
        </div>

        {/* Compteur */}
        <div className={`absolute top-6 z-30 bg-black/40 backdrop-blur-md text-white px-4 py-1 rounded-full text-xs font-bold font-latin border border-white/10 ${direction === "rtl" ? "left-6" : "right-6"}`}>
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Points de navigation */}
      <div className="flex justify-center gap-3 mt-8">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              index === currentIndex ? 'w-12 bg-[#E00A0A]' : 'w-4 bg-slate-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}