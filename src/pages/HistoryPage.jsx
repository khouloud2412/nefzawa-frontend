import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeaderSection from '../components/common/HeaderSection';
import TitreNefzawa from '../components/ui/TitreNefzawa';

import imgStart from '../assets/images/nefzawa-images/history-nefzawa/un-groupe-de-jeunes motivés.webp';   
import imgEvolution from '../assets/images/nefzawa-images/history-nefzawa/participation-nefzawa-UTMA.webp';
import imgSuccess from '../assets/images/nefzawa-images/history-nefzawa/nefzawa-un-véritable-acteur.webp';
import imgProjects from '../assets/images/nefzawa-images/history-nefzawa/tas7i7.webp';
import imgprogresse from '../assets/images/nefzawa-images/history-nefzawa/nefzawa-city-athar.webp';


export default function HistoryPage() {
  return (
    <div className="bg-white min-h-screen pb-40 font-latin text-slate-900 overflow-hidden" dir="ltr">
      <Helmet>
        <title>Notre Histoire - Nefzawa</title>
      </Helmet>

      <HeaderSection 
        title="Notre Histoire" 
        subtitle="Découvrez l’histoire de Nefzawa, un projet né du cœur du sud tunisien, devenu un symbole de développement et d’innovation" 
      />

      <div className="container mx-auto px-4 md:px-6">
        
        {/* BLOC 1 */}
        <section className="mt-32 mb-40">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#DF0A0A]/5 rounded-full blur-3xl -z-10"></div>
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-b-8 border-[#DF0A0A]">
                <img src={imgStart} alt="Nefzawa History" className="w-full h-[500px] object-cover" />
              </div>
            </div>
            <div className="lg:w-1/2">
              <TitreNefzawa title="Le Début" coloredPart="d'un Rêve" center={false} fontClass="font-latin" />
              <p className="text-xl  leading-relaxed text-slate-700 font-light text-justify">

                Il y a douze ans, au cœur du sud tunisien, un rêve ambitieux prenait forme. Sans formation spécifique, sans réseau préétabli et sans expérience préalable, un groupe de jeunes motivés s’est rassemblé autour d’une idée simple mais puissante : donner une voix à leur région, promouvoir le développement local et offrir un espace d’expression libre. Ce rêve, nommé Nefzawa, a grandi avec une conviction inébranlable, une grande détermination et une volonté de fer.
              </p>
            </div>
          </div>
        </section>

        {/* BLOC 2 */}
        <section className="mb-40">
          <div className="bg-slate-900 rounded-[4rem] p-8 md:p-20 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#DF0A0A]/10 rounded-full blur-[100px]"></div>
            <div className="flex flex-col lg:flex-row-reverse items-center gap-16 relative z-10">
              <div className="lg:w-1/2">
                <img src={imgEvolution} alt="Innovation" className="rounded-[3rem] shadow-xl w-full h-[400px] object-cover border-4 border-white/10" />
              </div>
              <div className="lg:w-1/2">
                <p className="text-xl  leading-relaxed font-light text-slate-00 text-justify">
                  Aujourd’hui, Nefzawa est bien plus qu’un média associatif. C’est un véritable acteur de changement qui a su se transformer, se diversifier et s’imposer comme un pilier incontournable dans le paysage médiatique tunisien. Au fil des années, grâce à des efforts constants et une persévérance sans faille, Nefzawa a construit une équipe passionnée, élargi ses partenariats et enrichi ses projets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BLOC 3 */}
        <section className="mb-40">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <TitreNefzawa title="Défis et" coloredPart="Apprentissages" center={true} fontClass="font-latin" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-xl leading-relaxed text-slate-700 font-light border-l-4 border-[#DF0A0A] pl-8 py-4 text-justify">
                
                Elle est devenue une organisation autonome qui a su gagner la confiance de son public et de ses partenaires, tant au niveau local qu’international. Chaque étape de cette aventure a été un apprentissage, parsemé de réussites et de défis. Pour l’équipe de Nefzawa, chaque échec s’est révélé une opportunité d’apprentissage, chaque succès, une motivation pour aller plus loin.
              </p>
            </div>
            <div className="order-1 lg:order-2">
               <img src={imgSuccess} alt="Success" className="rounded-[2.5rem] shadow-lg w-full h-[350px] object-cover" />
            </div>
          </div>
        </section>

        {/* BLOC 4 */}
        <section className="mb-40 relative">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3 p-10">
              <p className="text-xl  leading-relaxed text-slate-700 font-light  mb-10 text-justify">
                Ce parcours leur a permis de solidifier leurs valeurs, de structurer leur mission et de renforcer leur engagement envers la communauté. Aujourd’hui, la responsabilité de Nefzawa est immense : maintenir une qualité de production élevée, garantir la stabilité et le bien-être de son équipe, moderniser constamment ses équipements, et surtout, rester fidèle aux attentes de son public et de ses partenaires.
              </p>
              <div className="bg-[#DF0A0A]/5 p-10 rounded-[3rem] border border-[#DF0A0A]/10">
                <p className="text-xl leading-relaxed text-slate-700 font-light text-justify">
                  Au fil des années, Nefzawa a grandi et s’est diversifiée. Désormais, l’association englobe plusieurs initiatives qui participent toutes à son objectif de développement régional et de rayonnement culturel. Parmi elles, on trouve Nefzawa Radio, un média de proximité ancré dans la réalité locale ; Nefzawa TV, une plateforme visuelle qui met en lumière les enjeux sociétaux de la région ; et Nefzawa Academy, une académie agréée par le ministère de la Formation et de l’Emploi, qui forme les jeunes aux compétences professionnelles et entrepreneuriales.
                </p>
              </div>
            </div>
            <div className="lg:w-1/3 space-y-6">
                <div className="h-64 rounded-[2rem] overflow-hidden shadow-md">
                   <img src={imgProjects} className="w-full h-full object-cover" alt="Radio" />
                </div>
                <div className="h-64 rounded-[2rem] overflow-hidden shadow-md">
                   <img src={imgprogresse} className="w-full h-full object-cover" alt="Academy" />
                </div>
            </div>
          </div>
        </section>

        {/* BLOC 5 */}
        <section className="mb-40">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-12 bg-white border border-slate-100 shadow-xl rounded-[3rem] hover:border-[#DF0A0A]/30 transition-colors">
                <p className="text-xl leading-relaxed text-slate-700 text-justify">
                  Ces initiatives ne sont qu’une partie des nombreuses actions que Nefzawa mène chaque jour. Nefzawa a également lancé Tourism UP, un projet qui valorise les richesses touristiques de la région, ainsi que le GIE Nefzawa, un groupement économique destiné à soutenir les médias associatifs tout en promouvant les produits du terroir. 
                </p>
              </div>
              <div className="p-12 bg-slate-50 rounded-[3rem] border border-slate-100 shadow-inner">
                <p className="text-xl leading-relaxed text-slate-700 text-justify">
                  Pour compléter cette offre, l’association a également ouvert Restaurant Nefzawa et Résidence Nefzawa, des espaces de rencontre qui célèbrent la culture et la gastronomie locales. Enfin, Nefzawa City, un événement annuel majeur, rassemble la communauté autour de la promotion des talents locaux et des produits du terroir, renforçant le sentiment d’appartenance et de fierté régionale.
                </p>
              </div>
           </div>
        </section>

        {/* SECTION 6 */}
        <section className="text-center max-w-5xl mx-auto py-20 border-y border-slate-100">
           <p className="text-xl md:text-2xl leading-snug text-slate-900 font-black mb-10 ">
            Avec ce large éventail d’activités et de projets, Nefzawa a su dépasser son rôle de média pour devenir un acteur central de développement, un espace de formation et un véritable incubateur d’initiatives sociales et économiques.
           </p>
           <p className="text-xl leading-loose text-slate-600 font-light">
            Toujours fidèle à sa mission d’origine, Nefzawa continue de se réinventer pour mieux servir sa région et d’accompagner les jeunes vers un avenir prometteur. Ce parcours, animé par la passion et l’innovation, fait de Nefzawa bien plus qu’un simple média : c’est une référence en matière de médias associatifs et un modèle d’engagement pour le développement de la région du sud tunisien.
           </p>
           <div className="w-24 h-2 bg-[#DF0A0A] mx-auto mt-12 rounded-full"></div>
        </section>

      </div>
    </div>
  );
}