import React, { useState } from "react";
import { Play, X } from "lucide-react";
import TitreNefzawa from "@main/components/ui/TitreNefzawa";
import { Link } from "react-router-dom";

// Simulation de données vidéo
const VIDEO_DATA = [
  {
    id: "pxvXixO0ZFM",
    title: "Golden Voice",
    subtitle: "أغنية إنسان أنا إنسان",
    thumb: "nefzawa-golden-voice.webp",
  },
  {
    id: "VtHteu_TOEA",
    title: "Changer la réalité",
    subtitle: "  بدل الواقع",
    thumb: "badel-elwaka.webp",
  },
  {
    id: "kqSN5O2YagA",
    title: "Nefzawa Academy",
    subtitle: " المخيم التدريبي",
    thumb: "academie-nefzawa.webp",
  },
  {
    id: "I2AS2iJM444",
    title: "Alou Nefzawa",
    subtitle: " موسم جني التمور ",
    thumb: "alou-nefzawa.webp",
  },
  {
    id: "7Yijwb3yLfk",
    title: "Tas7i7",
    subtitle: "منصة تصحيح ",
    thumb: "tashih-nefzawa.webp",
  },
  {
    id: "uw_SsS3rcDc",
    title: "Nefzawa City ",
    subtitle: " نفزاوة سيتي",
    thumb: "nefzawa-city.webp",
  },
];

// Import automatique des miniatures
const thumbFiles = import.meta.glob(
  "/src/assets/images/nefzawa-images/tv-thumbs/*.webp",
  { eager: true },
);

export default function NefzawaTV() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <section className="py-20 bg-[#ffeeee] ">
      <div className="container mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-12">
          <TitreNefzawa
            title="Nefzawa"
            coloredPart="TV"
            center={true}
            dark={false}
            fontClass="font-latin"
          />
          <p className="text-slate-400 font-arabic text-lg mt-2">
            تشاهدون آخر انتاجاتنا على نفزاوة تيفي
          </p>
        </div>

        {/* Grille des vidéos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VIDEO_DATA.map((video, index) => {
            const imagePath =
              thumbFiles[
                `/src/assets/images/nefzawa-images/tv-thumbs/${video.thumb}`
              ]?.default;

            return (
              <div
                key={index}
                className="group cursor-pointer"
                onClick={() => setSelectedVideo(video.id)}
              >
                {/* Carte Vidéo */}
                <div className="relative aspect-video rounded-3xl overflow-hidden border-2 border-white group-hover:border-[#E00A0A] transition-all duration-500 shadow-lg">
                  <img
                    src={imagePath}
                    alt={video.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                  />

                  {/* Overlay avec bouton Play */}
                  <div className="absolute inset-0    flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#E00A0A] rounded-full flex items-center justify-center shadow-xl transform group-hover:scale-125 transition-transform duration-300">
                      <Play
                        fill="white"
                        className="text-white ml-1"
                        size={28}
                      />
                    </div>
                  </div>
                </div>

                {/* Titres */}
                <div className="mt-5 text-center">
                  <h4 className="font-latin font-bold text-lg tracking-tight group-hover:text-[#E00A0A] transition-colors">
                    {video.title}
                  </h4>
                  <p className="font-arabic text-slate-400 text-sm mt-1">
                    {video.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bouton Voir Plus */}
        <div className="mt-16 text-center">
          <Link
            to="/nefzawa-tv"
            className="inline-block px-10 py-4 bg-transparent border-2 border-[#E00A0A] text-black hover:text-slate-50 rounded-full font-bold hover:bg-[#E00A0A] transition-all duration-300 font-latin"
          >
            Visit Nefzawa TV
          </Link>
        </div>
      </div>

      {/* MODAL POPUP (S'affiche uniquement si selectedVideo n'est pas nul) */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          {/* Fond noir transparent */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedVideo(null)}
          ></div>

          {/* Conteneur Vidéo */}
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <button
              className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-[#E00A0A] transition-colors"
              onClick={() => setSelectedVideo(null)}
            >
              <X size={24} />
            </button>

            <iframe
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${selectedVideo}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}
