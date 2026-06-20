import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Cette ligne force le navigateur à remonter tout en haut 
    // dès que l'adresse URL (pathname) change.
    window.scrollTo(0, 0);

    // Envoyer la vue de page à Google Analytics
    ReactGA.send({ hitType: "pageview", page: pathname });

  }, [pathname]);
  
  return null; // Ce composant n'affiche rien visuellement
}
