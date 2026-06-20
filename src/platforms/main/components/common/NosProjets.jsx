import LogoLoop from "@main/components/ui/LogoLoop";
import TitreNefzawa from "@main/components/ui/TitreNefzawa";

// Import automatique des logos
const logoFiles = import.meta.glob(
  "../../../../assets/images/nefzawa-images/logo/*.webp", { eager: true });

export default function NosProjets() {
  const projectLogos = Object.values(logoFiles).map((img, index) => ({
    src: img.default || img,
    alt: `Projet Nefzawa ${index + 1}`,
  }));

  return (
    <section className=" py-20 overflow-hidden    bg-gradient-to-b from-[#ffeeee] via-white to-white">
      <div className="container mx-auto px-4 ">
        <TitreNefzawa
          title="Our"
          coloredPart="Projects"
          center={true}
          fontClass="font-latin"
        />

        {/* LE COMPOSANT  */}
        <div className="mt-10">
          {projectLogos.length > 0 ? (
            <LogoLoop
              logos={projectLogos}
              speed={60}
              logoHeight={120} // <--- REGLE LA TAILLE ICI
              gap={100} // <--- REGLE L'ESPACE ENTRE LES LOGOS ICI
              fadeOut={true}
              fadeOutColor="#ffffff"
              pauseOnHover={true}
            />
          ) : (
            <div className="h-20 flex items-center justify-center text-slate-400 italic">
              Chargement des logos...
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
