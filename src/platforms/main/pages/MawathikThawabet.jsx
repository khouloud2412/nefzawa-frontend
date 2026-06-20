import React from 'react';
import HeaderSection from '@main/components/common/HeaderSection';
import ImageCarousel from '@main/components/common/ImageCarousel';
import TitreNefzawa from '@main/components/ui/TitreNefzawa';
import { FileText, ExternalLink, Download } from 'lucide-react';

//  récupèration des fichiers
const imagesFolder = import.meta.glob('/src/assets/images/nefzawa-images/carousel-images/page-mawathik-thawabet/*.webp', { eager: true });

const DOCUMENTS_LIST = [
  { id: 1, title: "ميثاق أخلاقيات المؤسسة ", file: "/documents/ChartedeGestiondeNefzawa.pdf", type: "pdf" },
  { id: 2, title: "وثيقة مهام الإعلام الجمعياتي", file: "/documents/missionsdelacommunicationassociative.webp", type: "image" },
  { id: 3, title: "میثاق شرف الإذاعات الجمعياتية", file: "/documents/Chartedéthiquedesradiosassociatives.pdf", type: "pdf" },
  { id: 4, title: "میثاق جودة المضامين الاعلامية", file: "/documents/ChartedequalitéducontenumédiatiquepourNefzawa.pdf", type: "pdf" },
  { id: 5, title: "معايير الجودة الصحفية", file: "/documents/CriteresdequaliteNefzawadapteaprestest.pdf", type: "pdf" },
    { id: 6, title: "السياسة العامة لاستخدام أدوات الذكاء الاصطناعي في مؤسسة نفزاوة", file: "/documents/Politique-générale-d-utilisation-des-outils-d-intelligence-artificielle-dans-nefzawa.pdf", type: "pdf" },
  { id: 7, title: "الدليل التحريري لإذاعة نفزاوة ", file: "/documents/Guide-éditorial-de-Radio-nefzawa.pdf", type: "pdf" },
  { id: 8, title: "عملية معالجة المعلومات المنشورة والتحقق منها", file: "/documents/Processus-de-traitement-et-de-vérification-des-informations-publiées.pdf", type: "pdf" },
  { id: 9, title: "إجراء إدارة تدفق المحتوى الإخباري على الشبكات الاجتماعية كجزء من المنتج الصحفي", file: "/documents/Procédure-de-gestion-du-flux-de-contenu-d-actualité-sur-les-réseaux-sociaux-dans-le-cadre-du-produit-journalistique.pdf", type: "pdf" },
  { id: 10, title: "میثاق النشر على مواقع التواصل الاجتماعي لإذاعة نفزاوة", file: "/documents/Charte-de-publication-sur-les-réseaux-sociaux-de-Radio-Nefzawa.pdf", type: "pdf" },
  { id: 11, title: "دليل الكتابة الصحفية لإذاعة نفزاوة", file: "/documents/Guide-de-rédaction-journalistique-de-Radio-Nefzawa.pdf", type: "pdf" },
  { id: 12, title: "السياسة التحريرية لتغطية الأحداث المحلية الأليمة", file: "/documents/Processus-de-traitement-et-de-vérification-des-informations-publiées.pdf", type: "pdf" },


];

export default function MawathikThawabet() {
  
  //  LOGIQUE DE TRI PROFESSIONNELLE (Indispensable pour l'ordre 1, 2, 3...)
  const sortedImages = Object.entries(imagesFolder)
  .sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true }))
  .map(([, img]) => ({ 
    src: img.default || img,
    alt: "Nefzawa History Slide"
  }));

  return (
    <div className="bg-[#fdfdfd] min-h-screen pb-32 font-arabic" >
      {/* Header  */}
      <HeaderSection title="مواثيق وضوابط" subtitle="Consultez les principes et les règles qui encadrent Nefzawa"  />

      <div className="container mx-auto px-4 relative z-10 -mt-16">
        
        {/* Conteneur principal */}
        <div className="max-w-6xl mx-auto">
          
          {/* Titre et description  */}
          <div className="text-center my-32">
             <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed italic font-latin" >
               Retrouvez dans cette section un aperçu des principes et règles qui structurent Nefzawa. Parcourez le document et faites défiler le carousel pour en découvrir les différents aspects.
             </p>
          </div>

          {/* Affichage du Carrousel  */}
          <div className="relative">
             {/* Décoration de fond */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#E00A0A]/5 rounded-full blur-[120px] -z-10"></div>
             
             <ImageCarousel images={sortedImages} direction="ltr" />
          </div>

<section className="mt-32 border-t border-slate-100 pt-20" dir="rtl">
  <div className="text-center mb-16">
    <TitreNefzawa title="وثائق" coloredPart="مرجعية" center={true} />
    <p className="text-slate-500 mt-4 font-arabic">يمكنكم تحميل أو الاطلاع على الوثائق الرسمية المنظمة لعملنا</p>
  </div>

  {/* Grille de cartes  */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {DOCUMENTS_LIST.map((doc) => (
      <a
        key={doc.id}
        href={doc.file}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative bg-[#e00a0a17] p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center"
      >
        {/* Décoration en arrière-plan de la carte */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#E00A0A]/5 rounded-bl-[5rem] -z-0 group-hover:bg-[#E00A0A]/10 transition-colors"></div>

        {/* Icône du type de fichier */}
        <div className="relative z-10 w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-[#E00A0A] mb-6 group-hover:bg-[#E00A0A] group-hover:text-white transition-all duration-500 shadow-inner">
          <FileText size={40} strokeWidth={1.5} />
        </div>

        {/* Titre du document */}
        <h3 className="relative z-10 text-xl font-bold text-slate-800 font-arabic mb-4 group-hover:text-[#E00A0A] transition-colors">
          {doc.title}
        </h3>

        {/* Info type de fichier */}
        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-8">
          {doc.type} Document
        </span>

        {/* Bouton d'action */}
        <div className="mt-auto flex items-center gap-2 text-[#E00A0A] font-bold text-sm">
          <span>عرض الملف</span>
          <ExternalLink size={16} />
        </div>
      </a>
    ))}
  </div>
</section>

        </div>
      </div>
    </div>
  );
}