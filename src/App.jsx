import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// Layout et ScrollToTop
import MainLayout from "@layouts/MainLayout";
import ScrollToTop from "@main/components/common/ScrollToTop";

// Pages nefzawa.net (Plateforme Main)
import HomePage from "@main/pages/HomePage";
import NewsCategoryPage from "@main/pages/NewsCategoryPage";
import ArticleDetailPage from "@main/pages/ArticleDetailPage";
import NefzawaTVPage from "@main/pages/NefzawaTVPage";
import AlouNefzawaPage from "@main/pages/AlouNefzawaPage";
import RadioHistory from "@main/pages/RadioHistory";
import RadioPresentation from "@main/pages/RadioPresentation";
import MouwafakAalami from "@main/pages/MouwafakAalami";
import VisionNefzawa from "@main/pages/VisionNefzawa";
import MawathikThawabet from "@main/pages/MawathikThawabet";
import OrganigramPage from "@main/pages/OrganigramPage";
import LiveAudioPage from "@main/pages/LiveAudioPage";
import LiveVideoPage from "@main/pages/LiveVideoPage";
import HistoryPage from "@main/pages/HistoryPage";
import ContactPage from "@main/pages/ContactPage";
import SearchResultsPage from "@main/pages/SearchResultsPage";
import NefzawaPrivacy from "@main/pages/NefzawaPrivacy";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Site principal : nefzawa.net */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/news/:categoryName" element={<NewsCategoryPage />} />
            <Route
              path="/article/:categoryName/:slug"
              element={<ArticleDetailPage />}
            />
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
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/privacy-policy" element={<NefzawaPrivacy />} />
          </Route>

          {/* Les futures routes /city et /academie viendront ici plus tard */}
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
