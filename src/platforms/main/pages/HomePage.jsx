import HeroNefzawa from "@main/components/common/HeroNefzawa";
import AboutSection from "@main/components/common/AboutSection";
import NosProjets from "@main/components/common/NosProjets";

import { Helmet } from "react-helmet-async";
import ProjectsShowcase from "@main/components/common/ProjectsShowcase";
import EditorialNews from "@main/components/common/EditorialNews";
import NefzawaTV from "@main/components/common/NefzawaTV";
import NewsCarousel from "@main/components/common/NewsCarousel";
import AdBanner from "@main/components/ui/AdBanner";

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
