import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getArticlesByCategory } from '../../services/api';
import TitreNefzawa from '../ui/TitreNefzawa';

export default function NewsCarousel({ category, title, coloredPart, btnText = "اقرأ المزيد" }) {
  const [originalArticles, setOriginalArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(3); 
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const data = await getArticlesByCategory(category, 1, 6);
        setOriginalArticles(data.articles || []);
        setCurrentIndex(3);
      } catch { setLoading(false); } finally { setLoading(false); }
    };
    fetchArticles();
  }, [category]);

  const displayArticles = originalArticles.length > 0 ? [
    ...originalArticles.slice(-3), ...originalArticles, ...originalArticles.slice(0, 3)
  ] : [];

  const nextSlide = useCallback(() => {
    if (originalArticles.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [originalArticles.length]);

  const prevSlide = () => {
    if (originalArticles.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    if (originalArticles.length === 0) return;
    const total = originalArticles.length;
    if (currentIndex === total + 3) { setTimeout(() => { setIsTransitioning(false); setCurrentIndex(3); }, 500); }
    if (currentIndex === 0) { setTimeout(() => { setIsTransitioning(false); setCurrentIndex(total); }, 500); }
  }, [currentIndex, originalArticles.length]);

  useEffect(() => {
    if (!isPaused && originalArticles.length > 0) {
      const timer = setInterval(nextSlide, 3500);
      return () => clearInterval(timer);
    }
  }, [nextSlide, isPaused, originalArticles.length]);

  if (loading) return <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-[#E00A0A]" size={40} /></div>;
  if (originalArticles.length === 0) return null;

  const cleanURL = (text) => text.trim().replace(/\s+/g, '-');

  return (
    <section className="py-32 bg-white overflow-hidden" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <TitreNefzawa title={title} coloredPart={coloredPart} />
          <div className="flex gap-2">
            <button onClick={prevSlide} className="p-2 rounded-full border hover:bg-[#E00A0A] hover:text-white transition-all shadow-sm"><ChevronRight size={24} /></button>
            <button onClick={nextSlide} className="p-2 rounded-full border hover:bg-[#E00A0A] hover:text-white transition-all shadow-sm"><ChevronLeft size={24} /></button>
          </div>
        </div>
        <div className="relative overflow-hidden" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          <div className={`flex transition-transform ${isTransitioning ? 'duration-500 ease-out' : 'duration-0'}`}
               style={{ transform: `translateX(${currentIndex * (window.innerWidth < 768 ? 100 : 33.333)}%)` }}>
            {displayArticles.map((article, idx) => (
              <div key={idx} className="w-full md:w-1/3 flex-shrink-0 px-3">
                <div className="bg-[#ffeeee] rounded-[2.5rem] border h-full flex flex-col group hover:shadow-xl transition-all duration-300">
                  <div className="relative h-52 overflow-hidden rounded-t-[2.5rem]">
                    <img src={article.image} alt={article.title} loading="lazy" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#E00A0A]">{article.category}</div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow text-right">
                    <div className="flex items-center gap-2 text-slate-400 text-xs mb-3"><Calendar size={14} /><span>{article.date}</span></div>
                    <h4 className="text-xl font-bold text-slate-900 font-arabic leading-snug line-clamp-2 mb-6">{article.title}</h4>
                    <Link to={`/article/${cleanURL(article.category)}/${article.slug}`} className="mt-auto inline-flex items-center justify-center w-full py-3 bg-white border text-slate-700 rounded-2xl font-bold text-sm hover:bg-[#E00A0A] hover:text-white transition-all duration-300">
                      {btnText}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}