import React from "react";
import HeaderSection from "@main/components/common/HeaderSection";
import ImageCarousel from "@main/components/common/ImageCarousel";
import TitreNefzawa from "@main/components/ui/TitreNefzawa";

//  récupèration des fichiers
const imagesFolder = import.meta.glob(
  "/src/assets/images/nefzawa-images/carousel-images/page-vision-nefzawa/*.webp",
  { eager: true },
);

export default function VisionNefzawa() {
  // 2. LOGIQUE DE TRI PROFESSIONNELLE (Indispensable pour l'ordre 1, 2, 3...)
  const sortedImages = Object.entries(imagesFolder)
    .sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true }))
    .map(([, img]) => ({
      src: img.default || img,
      alt: "Nefzawa History Slide",
    }));

  return (
    <div className="bg-[#fdfdfd] min-h-screen pb-32 font-arabic">
      {/* Header  */}
      <HeaderSection
        title="رؤية نفزاوة"
        subtitle="Explorez la vision et les grandes orientations de Nefzawa"
      />

      <div className="container mx-auto px-4 relative z-10 -mt-16">
        {/* Conteneur principal */}
        <div className="max-w-6xl mx-auto">
          {/* Titre et description */}
          <div className="text-center my-32">
            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed italic font-latin">
              À travers ce carousel, découvrez la vision de Nefzawa et ses
              principales orientations. Nous vous invitons à le faire défiler
              pour en avoir une vision d’ensemble.
            </p>
          </div>

          {/* Affichage du Carrousel */}
          <div className="relative">
            {/* Décoration de fond */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#E00A0A]/5 rounded-full blur-[120px] -z-10"></div>

            <ImageCarousel images={sortedImages} direction="ltr" />
          </div>
        </div>
      </div>
    </div>
  );
}
