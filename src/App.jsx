import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/common/Layout"; 
import HomePage from "./pages/HomePage";
import NewsCategoryPage from "./pages/NewsCategoryPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import NefzawaTVPage from "./pages/NefzawaTVPage";
import AlouNefzawaPage from "./pages/AlouNefzawaPage";
import RadioHistory from "./pages/RadioHistory";
import RadioPresentation from "./pages/RadioPresentation";
import MouwafakAalami from "./pages/MouwafakAalami";
import VisionNefzawa from "./pages/VisionNefzawa";
import MawathikThawabet from "./pages/MawathikThawabet";
import OrganigramPage from "./pages/OrganigramPage";
import LiveAudioPage from "./pages/LiveAudioPage";
import LiveVideoPage from "./pages/LiveVideoPage";
import HistoryPage from "./pages/HistoryPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* Le Layout entoure toutes les pages pour garder la Navbar et le Footer fixes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            
            {/* Route dynamique pour les catégories */}
            <Route path="/news/:categoryName" element={<NewsCategoryPage />} />

            {/* Route SEO-Friendly pour les articles : /article/categorie/titre-slug */}
            <Route path="/article/:categoryName/:slug" element={<ArticleDetailPage />} />   

            {/* Pages institutionnelles et média */}
            <Route path="/nefzawa-tv" element={<NefzawaTVPage />} />
            <Route path="/alou-nefzawa" element={<AlouNefzawaPage />} />
            <Route path="/RadioHistory" element={<RadioHistory />} />
            <Route path="/RadioPresentation" element={<RadioPresentation />} />
            <Route path="/MouwafakAalami" element={<MouwafakAalami />} />
            <Route path="/VisionNefzawa" element={<VisionNefzawa />} />
            <Route path="/MawathikThawabet" element={<MawathikThawabet />} />
            <Route path="/OrganigramPage" element={<OrganigramPage />} />
            <Route path="/LiveAudioPage" element={<LiveAudioPage />} />
            <Route path="/LiveVideoPage" element={<LiveVideoPage />} />
            <Route path="/HistoryPage" element={<HistoryPage />} />
            <Route path="/ContactPage" element={<ContactPage />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;