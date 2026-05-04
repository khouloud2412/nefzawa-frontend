import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

// Importation automatique des images du dossier projects-stack
const stackFiles = import.meta.glob('../../assets/images/nefzawa-images/projects-stack/*.{webp,png,jpg}', { eager: true });
const stackImages = Object.values(stackFiles).map(img => img.default || img);

const projectsList = [
  "نفزاوة سيتي", "أكاديمية نفزاوة", "مجمع نفزاوة", "تصحيح",
  "صوت نفزاوة الذهبي", "ذبذبات الصحراء", "نفزاوة أف أم",
  "توريزم آب", "ألو نفزاوة", "نفزاوة تي في", "حوش النخلة"
];

export default function ProjectsShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Autoplay pour faire défiler la pile
  useEffect(() => {
    if (stackImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stackImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-white overflow-hidden bg-gradient-to-b from-white via-[#ffeeee] to-[#ffeeee]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* --- COLONNE GAUCHE : TOUT AU CENTRE --- */}
          <div className="flex flex-col items-center text-center order-1">
            {/* Titre Latin */}
            <h2 className="text-6xl md:text-8xl font-black text-[#DF0A0A] font-latin tracking-tighter leading-none mb-2">
              NEFZAWA
            </h2>
            {/* Slogan Latin */}
            <p className="text-lg md:text-xl text-slate-500 font-latin italic mb-10">
              "is more than a media, it's a hidden treasure"
            </p>

            {/* Titre Arabe (Noir et plus petit) */}
            <div className="flex flex-col items-center mb-8">
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 font-arabic">
                مشاريعنا
              </h3>
              <div className="w-16 h-1.5 bg-[#DF0A0A] mt-2 rounded-full"></div>
            </div>

            {/* Liste des projets en 2 colonnes centrées */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-10 w-full max-w-xl" dir="rtl">
              {projectsList.map((project, index) => (
                <div key={index} className="flex items-center gap-3 group justify-start">
                  <CheckCircle2 size={18} className="text-[#DF0A0A] flex-shrink-0" />
                  <span className="text-base md:text-lg text-slate-700 font-arabic font-medium group-hover:text-black transition-colors text-right">
                    {project}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* --- COLONNE DROITE : STACK D'IMAGES (EFFET ÉVENTAIL) --- */}
          <div className="order-2 flex justify-center items-center relative h-[450px] md:h-[550px]">
            {/* Décoration de fond diffuse */}
            <div className="absolute w-80 h-80 bg-[#DF0A0A]/5 rounded-full blur-3xl"></div>

            <div className="relative w-full max-w-[320px] h-[450px]">
              {stackImages.map((src, index) => {
                // Calcul de la position dans la pile (0 = dessus, 1 = derrière, 2 = encore derrière...)
                const position = (index - currentIndex + stackImages.length) % stackImages.length;
                
                // On n'affiche que les 4 premières images de la pile pour la performance
                const isVisible = position < 4;

                return (
                  <div
                    key={index}
                    style={{
                      zIndex: 30 - position,
                      transform: isVisible 
                        ? `translateX(${position * 12}px) translateY(${position * 8}px) rotate(${position * 3}deg) scale(${1 - position * 0.02})` 
                        : 'scale(0.8) opacity(0)',
                      opacity: isVisible ? (1 - position * 0.25) : 0,
                    }}
                    className="absolute inset-0 transition-all duration-700 ease-in-out rounded-[2.5rem] overflow-hidden border-[6px] border-white shadow-2xl bg-white"
                  >
                    <img 
                      src={src} 
                      alt="Nefzawa Project" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}