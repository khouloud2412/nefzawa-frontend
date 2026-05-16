import HeroNefzawa from "../components/common/HeroNefzawa";
import AboutSection from "../components/common/AboutSection";
import NosProjets from "../components/common/NosProjets";

import { Helmet } from "react-helmet-async";
import ProjectsShowcase from "../components/common/ProjectsShowcase";
import EditorialNews from "../components/common/EditorialNews";
import NefzawaTV from "../components/common/NefzawaTV";
import NewsCarousel from "../components/common/NewsCarousel";
import AdBanner from "../components/ui/AdBanner";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>نفزاوة - الرئيسية</title>
      </Helmet>

      {/* Hero  */}
      <HeroNefzawa />
      <AboutSection />
       
      <NosProjets />
      <AdBanner slot="6251692549" /> 
      <ProjectsShowcase />
      <EditorialNews
        sectionTitle="آخر"
        sectionColored="الأخبار"
        categories={[
          "أخبار قبلي",
          "الأخبار الوطنية",
          "الأخبار العالمية",
          "الأخبار الرياضية",
        ]}
      />
      <NefzawaTV />

      <NewsCarousel
        category="أخبار قبلي"
        title="أخبار"
        coloredPart="قبلي"
        btnText="اقرأ المقال"
      />
       {/* On utilise ici ton bloc Multiplex pour finir en beauté */}
      <AdBanner slot="2869639289" format="autorelaxed" /> 
    </>
  );
}
