import { useState, useEffect, useRef } from "react"; //  Ajout de useEffect et useRef
import { Link, useLocation } from "react-router-dom"; //  Ajout de useLocation pour détecter les changements de page
import { Mic, Video, Menu, X, ChevronDown, ChevronLeft } from "lucide-react";
import logoNefzawa from "../../assets/images/nefzawa-images/logo-nefzawa.webp";
import { NavLinks } from "./HomeNav";

export default function PracticeNavbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubSub, setOpenSubSub] = useState(null);
  
  const navRef = useRef(null); //  Référence pour détecter les clics extérieurs
  const location = useLocation(); //  Pour savoir quand on change de page

  // --- LOGIQUE : FERMER TOUT AU CHANGEMENT DE PAGE ---
  useEffect(() => {
    // On utilise setTimeout avec 0 milliseconde. 
    // Cela dit à React : "Finit d'abord d'afficher la page, et juste après, fais ça."
    const timer = setTimeout(() => {
      setIsMobileOpen(false);
      setOpenDropdown(null);
      setOpenSubSub(null);
    }, 0);

    return () => clearTimeout(timer); // Nettoyage du timer
  }, [location.pathname]);

  // --- LOGIQUE : CLIC EXTÉRIEUR ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null);
        setOpenSubSub(null);
        // On ne ferme pas isMobileOpen ici pour éviter les bugs sur mobile, 
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
    setOpenSubSub(null);
  };

  const toggleSubSub = (id) => {
    setOpenSubSub(openSubSub === id ? null : id);
  };

  return (
    //  sticky top-0 et z-50 pour rester au dessus de tout
    <nav 
      ref={navRef}
      dir="rtl" 
      className="bg-white/95 backdrop-blur-md shadow-md sticky top-0 z-[100] font-arabic transition-all"
    >
      <div className="flex items-center justify-between px-4 md:px-8 h-20">
        
        {/*  LOGO */}
        <div className="flex-1">
          <Link to="/">
            <img
              src={logoNefzawa}
              alt="Logo"
              className="h-16 md:h-20 lg:h-24 transition-all duration-300"
            />
          </Link>
        </div>

        {/* MENU DESKTOP */}
        <div className="hidden lg:flex gap-6 items-center">
          {NavLinks.map((link) => (
            <div key={link.id} className="relative">
              {link.submenu ? (
                <button
                  onClick={() => toggleDropdown(link.id)}
                  className={`flex items-center gap-1 font-medium py-5 transition-colors ${openDropdown === link.id ? 'text-[#E00A0A]' : 'text-gray-700 hover:text-[#E00A0A]'}`}
                >
                  {link.name} <ChevronDown size={14} className={`transition-transform ${openDropdown === link.id ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <Link
                  to={link.path}
                  className="text-gray-700 hover:text-[#E00A0A] font-medium transition-colors"
                >
                  {link.name}
                </Link>
              )}

              {/* SOUS-MENU (NIVEAU 2) */}
              {link.submenu && openDropdown === link.id && (
                <div className="absolute top-full right-0 bg-white border border-slate-100 shadow-2xl rounded-2xl py-3 w-60 z-50 animate-in fade-in slide-in-from-top-2">
                  {link.submenu.map((sub) => (
                    <div key={sub.id} className="relative px-2">
                      {sub.submenu ? (
                        <>
                          <button
                            onClick={() => toggleSubSub(sub.id)}
                            className={`w-full flex justify-between items-center px-4 py-2.5 rounded-xl text-sm transition-all ${openSubSub === sub.id ? 'bg-red-50 text-[#E00A0A]' : 'hover:bg-slate-50 text-gray-700'}`}
                          >
                            <span>{sub.name}</span>
                            <ChevronLeft size={14} />
                          </button>
                          {openSubSub === sub.id && (
                            <div className="absolute top-0 right-full mr-2 bg-white border border-slate-100 shadow-2xl rounded-2xl py-2 w-52 animate-in fade-in slide-in-from-right-2">
                              {sub.submenu.map((item) => (
                                <Link
                                  key={item.id}
                                  to={item.path}
                                  className="block px-5 py-2 text-sm text-gray-600 hover:text-[#E00A0A] hover:bg-red-50/50"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <Link
                          to={sub.path}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-slate-50 rounded-xl transition-all"
                        >
                          {sub.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ICONES DIRECT ET BURGER */}
        <div className="flex-1 flex justify-end items-center gap-3 sm:gap-6">
          <div className="hidden sm:flex gap-4">
            <Link to="/LiveAudioPage" className="flex items-center gap-2 text-[#E00A0A] hover:opacity-80 transition-all bg-red-50 px-3 py-2 rounded-xl">
              <span className="text-xs font-bold">مباشر أوديو</span>
              <Mic size={18} />
            </Link>
            <Link to="/LiveVideoPage" className="flex items-center gap-2 text-white bg-[#E00A0A] px-3 py-2 rounded-xl hover:bg-black transition-all">
              <span className="text-xs font-bold">مباشر فيديو</span>
              <Video size={18} />
            </Link>
          </div>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2.5 text-gray-800 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 4. MENU MOBILE  */}
      {isMobileOpen && (
        <>
          {/* Overlay pour fermer le menu en cliquant sur le flou */}
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1]" onClick={() => setIsMobileOpen(false)}></div>
          
          <div className="lg:hidden bg-white border-t border-slate-100 shadow-2xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-top duration-300">
            {/* Directs sur mobile */}
            <div className="flex gap-3 p-4 sm:hidden border-b border-slate-50">
              <Link to="/LiveAudioPage" className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-50 text-[#E00A0A] rounded-xl font-bold text-sm">
                <Mic size={18} /> أوديو
              </Link>
              <Link to="/LiveVideoPage" className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#E00A0A] text-white rounded-xl font-bold text-sm">
                <Video size={18} /> فيديو
              </Link>
            </div>

            <div className="p-2">
              {NavLinks.map((link) => (
                <div key={link.id} className="mb-1">
                  <div
                    className={`flex justify-between items-center p-4 rounded-2xl ${openDropdown === link.id ? 'bg-red-50/50 text-[#E00A0A]' : 'text-gray-800'}`}
                    onClick={() => link.submenu ? toggleDropdown(link.id) : null}
                  >
                    {link.submenu ? (
                      <span className="font-bold">{link.name}</span>
                    ) : (
                      <Link to={link.path} className="w-full font-bold">{link.name}</Link>
                    )}
                    {link.submenu && <ChevronDown size={18} className={`transition-transform ${openDropdown === link.id ? 'rotate-180' : ''}`} />}
                  </div>

                  {link.submenu && openDropdown === link.id && (
                    <div className="mx-4 mb-2 space-y-1">
                      {link.submenu.map((sub) => (
                        <div key={sub.id}>
                          <div
                            className="flex justify-between items-center p-3 rounded-xl text-sm text-gray-600 hover:bg-slate-50"
                            onClick={() => sub.submenu ? toggleSubSub(sub.id) : null}
                          >
                            {sub.submenu ? <span>{sub.name}</span> : <Link to={sub.path} className="w-full">{sub.name}</Link>}
                            {sub.submenu && <ChevronDown size={14} className={openSubSub === sub.id ? 'rotate-180' : ''} />}
                          </div>
                          {sub.submenu && openSubSub === sub.id && (
                            <div className="mr-6 my-1 border-r-2 border-red-100 flex flex-col">
                              {sub.submenu.map((item) => (
                                <Link key={item.id} to={item.path} className="px-4 py-2 text-xs text-gray-500 hover:text-[#E00A0A]">
                                  • {item.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}