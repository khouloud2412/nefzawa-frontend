import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchArticles } from '@shared/services/api';
import HeaderSection from '@main/components/common/HeaderSection';
import { Calendar, ChevronLeft, Loader2, Clock } from 'lucide-react';

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || ""; // Récupère le tag depuis ?q=...
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const data = await searchArticles(query);
      setArticles(data.articles);
      setLoading(false);
      window.scrollTo(0, 0);
    };
    if (query) fetchResults();
  }, [query]);

  // Nettoyage de l'URL pour les liens
  const cleanURL = (text) => text.trim().replace(/\s+/g, '-');

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-arabic" dir="rtl">
      {/* Le titre de la page devient le mot-clé (Tag) */}
      <HeaderSection 
        title={`#${query}`} 
        subtitle={`نتائج البحث عن: ${query}`} 
      />

      <div className="container mx-auto px-4 mt-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="animate-spin text-[#E00A0A]" size={48} />
            <p className="text-slate-400 animate-pulse">جاري البحث...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-40 text-slate-500">
            لا توجد مقالات تحتوي على هذا الكلمة في عناوينها.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {articles.map((article) => (
              <Link 
                key={article.id} 
                to={`/article/${cleanURL(article.category)}/${article.slug}`}
                className="group bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 flex flex-col hover:shadow-xl transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>

                <div className="p-6 flex flex-col flex-grow text-right">
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] mb-3">
                    <Calendar size={12} className="text-[#E00A0A]" />
                    <span>{article.date}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug line-clamp-3 group-hover:text-[#E00A0A] transition-colors mb-4">
                    {article.title}
                  </h3>

                  <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-[#E00A0A] text-xs font-black uppercase tracking-widest">{article.category}</span>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-[#E00A0A] group-hover:text-white transition-colors">
                      <ChevronLeft size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}