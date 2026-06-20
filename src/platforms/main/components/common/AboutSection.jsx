import React from "react";
import { Eye, Handshake } from "lucide-react";
import TitreNefzawa from "@main/components/ui/TitreNefzawa";

export default function AboutSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-[#ffeeee] to-[#ffeeee]">
      {/* ÉLÉMENT DÉCORATIF DISCRET */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-100/30 rounded-full blur-3xl -mr-32"></div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* TITRE PRINCIPAL (Tajawal) */}
        <TitreNefzawa
          title="About"
          coloredPart="Us"
          center={true}
          fontClass="font-latin"
        />

        {/*  PARAGRAPHE D'INTRODUCTION  */}
        <div className="text-center mb-16">
          <p className="text-xl md:text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto font-latin font-medium">
            Founded in 2012,{" "}
            <span className="font-bold text-slate-900">Nefzawa</span> is
            dedicated to combating media marginalization in rural areas. It
            defines itself as a hub for the development of associative media and
            a nursery for the empowerment of youth in Tunisia, specifically in
            the southern regions.
          </p>
        </div>

        {/*  VIDÉO */}
        <div className="relative max-w-4xl mx-auto mb-28">
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-black aspect-video border-[6px] border-white">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/kcwXZaStBTQ?si=ShplUBVn_76VeTM1"
              title="Nefzawa Presentation"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/*  GRILLE INFOS (RTL : Vision à droite, Partenaires à gauche) */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24"
          dir="rtl"
        >
          {/* COLONNE VISION (À DROITE en Arabe) */}
          <div className="flex flex-col items-center text-center group">
            <div className="relative mb-6">
              {/* Effet d'anneaux flottants */}
              <div className="absolute inset-0 bg-[#E00A0A] rounded-full scale-150 opacity-5 group-hover:scale-[1.8] group-hover:opacity-10 transition-all duration-700"></div>
              <div className="relative w-20 h-20 bg-white shadow-lg rounded-full flex items-center justify-center text-[#E00A0A]">
                <Eye size={36} strokeWidth={1.5} />
              </div>
            </div>

            <h3 className="text-3xl font-black text-slate-900 font-arabic mb-4">
              رؤيتنا
            </h3>
            <p className="text-lg text-slate-600 font-arabic leading-relaxed max-w-sm">
              تطوير وتعزيز صحافة الحلول ، وتغيير الصور النمطية السائدة في منطقة
              قبلي وتسليط الضوء على قصص نجاح مواطني قبلي
            </p>
          </div>

          {/* COLONNE PARTENAIRES (À GAUCHE en Arabe) */}
          <div className="flex flex-col items-center text-center group">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-[#E00A0A] rounded-full scale-150 opacity-5 group-hover:scale-[1.8] group-hover:opacity-10 transition-all duration-700"></div>
              <div className="relative w-20 h-20 bg-white shadow-lg rounded-full flex items-center justify-center text-[#E00A0A]">
                <Handshake size={36} strokeWidth={1.5} />
              </div>
            </div>

            <h3 className="text-3xl font-black text-slate-900 font-arabic mb-4">
              شركاؤنا
            </h3>
            <p className="text-lg text-slate-600 font-arabic leading-relaxed max-w-sm">
              جمعيات وإعلاميين وصحفيين من مختلف ولايات الجنوب التونسي (قابس ،
              مدنين ، تطاوين ، قفصة. ، قبلي وتوزر)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
