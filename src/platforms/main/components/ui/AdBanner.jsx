import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function AdBanner({ slot, format = 'auto', responsive = 'true', style = {} }) {
  const location = useLocation();
  const adRef = useRef(null);
  
  // Pas besoin de reset manuel : la 'key' sur la div parente 
  // remettra ces compteurs à zéro automatiquement à chaque changement de page.
  const [retryCount, setRetryCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadAd = () => {
      try {
        if (window.adsbygoogle && adRef.current) {
          // On vérifie si la pub n'a pas déjà été traitée par Google
          if (!adRef.current.getAttribute('data-adsbygoogle-status')) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            setIsLoaded(true);
          }
        } 
        else if (!window.adsbygoogle && retryCount < 3) {
          // Si le script Google n'est pas encore là, on tente un retry
          setTimeout(() => setRetryCount(prev => prev + 1), 1000);
        }
      } catch (e) {
        console.error("AdSense Error:", e);
      }
    };

    // On attend un peu que le DOM soit stable
    const timer = setTimeout(loadAd, 300);
    return () => clearTimeout(timer);
  }, [retryCount, location.pathname]); // On écoute le retry et le changement de page

  return (
    <div 
      // La KEY est magique : elle force React à recréer un composant "propre" 
      // et réinitialise les states internes sans erreur.
      key={location.pathname} 
      className="relative my-8 overflow-hidden w-full min-h-[120px] bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-center"
    >
      {/* Skeleton de chargement */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 animate-pulse">
          <div className="w-8 h-8 border-2 border-slate-200 border-t-[#E00A0A] rounded-full animate-spin"></div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-latin">
            Publicité
          </span>
        </div>
      )}

      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ 
            display: 'block', 
            minWidth: '250px', 
            width: '100%',
            opacity: isLoaded ? 1 : 0, 
            ...style 
        }}
        data-ad-client="ca-pub-9350701776877642" 
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      ></ins>
    </div>
  );
}