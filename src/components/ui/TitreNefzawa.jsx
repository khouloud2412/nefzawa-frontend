import React from 'react';

// On ajoute "fontClass" dans les paramètres (props)
export default function TitreNefzawa({ title, coloredPart, center = false, dark = false, fontClass = "font-arabic" }) {
  return (
    <div className={`mb-10 ${center ? 'text-center' : 'text-right'}`}>
      {/* On utilise la variable fontClass ici au lieu de font-arabic en dur */}
      <h2 className={`text-3xl md:text-5xl font-black tracking-tight uppercase ${fontClass} ${dark ? 'text-white' : 'text-slate-900'}`}>
        {title} <span className="text-[#E00A0A]">{coloredPart}</span>
      </h2>
      
      {/* La barre décorative sous le titre */}
      <div className={`w-24 h-1.5 bg-[#E00A0A] mt-4 rounded-full ${center ? 'mx-auto' : 'mr-0 ml-auto'}`}></div>
    </div>
  );
}