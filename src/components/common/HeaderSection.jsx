import React from "react";

export default function HeaderSection({ title, subtitle }) {
  return (
    <section className="relative py-24 overflow-hidden bg-[#0B0F1A]">

      {/* Background glow layers  */}
      <div className="absolute inset-0">
        
        {/* red glow */}
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#E00A0A]/20 blur-[120px] rounded-full"></div>
        
        {/* dark blue accent */}
        <div className="absolute bottom-[-120px] right-[-80px] w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full"></div>

        {/* subtle noise overlay (very light) */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>

      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">

        {/* Titre */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white font-arabic leading-tight tracking-tight">
          {title}
        </h1>

        {/* Sous-titre */}
        {subtitle && (
          <p className="mt-6 text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-arabic leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Divider moderne */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <span className="w-16 h-[2px] bg-gradient-to-r from-transparent to-[#E00A0A]"></span>
          <span className="w-2 h-2 bg-[#E00A0A] rounded-full"></span>
          <span className="w-16 h-[2px] bg-gradient-to-l from-transparent to-[#E00A0A]"></span>
        </div>

      </div>
    </section>
  );
}