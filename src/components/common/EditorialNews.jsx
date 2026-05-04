import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Loader2 } from 'lucide-react';
import { getArticlesByCategory } from '../../services/api';
import TitreNefzawa from '../ui/TitreNefzawa';

export default function EditorialNews({ sectionTitle, sectionColored, categories = [] }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      try {
        const requests = categories.map(cat => getArticlesByCategory(cat, 1, 12));
        const results = await Promise.all(requests);
        let allArticles = results.flatMap(res => res.articles);
        const uniqueArticles = Array.from(new Map(allArticles.map(item => [item.id, item])).values());
        
        // Tri par date brute avant sélection
        uniqueArticles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setArticles(uniqueArticles);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    if (categories.length > 0) loadArticles();
  }, [categories]);

  const starArticle = articles.find(a => a.isFeatured === true) || articles[0];
  const otherArticles = articles.filter(a => a.id !== starArticle?.id);

  if (loading) return <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-[#DF0A0A]" size={40} /></div>;
  if (!starArticle) return null;

  const cleanURL = (text) => text.trim().replace(/\s+/g, '-');

  return (
    <section className="py-16 bg-white" dir="rtl">
      <div className="container mx-auto px-4">
        <TitreNefzawa title={sectionTitle} coloredPart={sectionColored} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          <div className="lg:col-span-2 group relative">
            <Link to={`/article/${cleanURL(starArticle.category)}/${starArticle.slug}`}>
              <div className="relative overflow-hidden rounded-[2rem] h-[450px] md:h-[550px] shadow-lg bg-slate-100 border border-slate-100">
                <img src={starArticle.image} alt={starArticle.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 p-6 md:p-10 text-right w-full text-white">
                  <span className="bg-[#DF0A0A] px-4 py-1 rounded-full text-xs font-bold mb-4 inline-block">{starArticle.category}</span>
                  <h3 className="text-2xl md:text-4xl font-black leading-tight line-clamp-2">{starArticle.title}</h3>
                  <div className="flex items-center gap-4 mt-4 text-slate-300 text-sm font-light"><Calendar size={14} /><span>{starArticle.date}</span></div>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex flex-col gap-6">
            {otherArticles.slice(0, 4).map((article) => (
              <Link key={article.id} to={`/article/${cleanURL(article.category)}/${article.slug}`} className="group block">
                <div className="flex gap-4 items-start bg-slate-50 p-3 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-red-50">
                  <div className="w-24 h-24 md:w-28 md:h-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-200">
                    <img src={article.image} alt={article.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" />
                  </div>
                  <div className="text-right flex flex-col justify-between py-1 h-24 md:h-28">
                    <div>
                      <span className="text-[#DF0A0A] text-[10px] font-black uppercase tracking-tighter">{article.category}</span>
                      <h4 className="text-base md:text-lg font-bold text-slate-900 group-hover:text-[#DF0A0A] transition-colors leading-snug line-clamp-2 mt-1">{article.title}</h4>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400 text-[10px] mt-2 font-medium"><Clock size={10} /><span>{article.date}</span></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}