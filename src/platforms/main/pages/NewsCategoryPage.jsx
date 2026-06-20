import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { getArticlesByCategory } from '@shared/services/api';
import HeaderSection from '@main/components/common/HeaderSection';
import { Calendar, ChevronRight, ChevronLeft, Loader2, Clock } from 'lucide-react';

export default function NewsCategoryPage() {
  const { categoryName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const [data, setData] = useState({ articles: [], pagination: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchNews = async () => {
      try {
        const response = await getArticlesByCategory(categoryName, currentPage);
        if (isMounted) {
          setData(response);
          setLoading(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } catch { if (isMounted) setLoading(false); }
    };
    fetchNews();
    return () => { isMounted = false; setLoading(true); };
  }, [categoryName, currentPage]);

  const handlePageChange = (pageNumber) => setSearchParams({ page: pageNumber });

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-arabic" dir="rtl">
      <HeaderSection title={categoryName} subtitle={`آخر المستجدات `} />
      <div className="container mx-auto px-4 mt-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="animate-spin text-[#E00A0A]" size={48} />
            <p className="text-slate-400 animate-pulse">جاري تحميل الأخبار...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.articles.map((article) => (
                <Link key={article.id} to={`/article/${article.category.replace(/\s+/g, '-')}/${article.slug}`}
                      className="group bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 flex flex-col hover:shadow-xl transition-all duration-500">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] mb-3">
                      <Calendar size={12} className="text-[#E00A0A]" /><span>{article.date}</span>
                      {/*<span className="mx-1">•</span><Clock size={12} /><span>5 دقيقة</span>*/}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug line-clamp-3 group-hover:text-[#E00A0A] transition-colors mb-4">{article.title}</h3>
                    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-[#E00A0A] text-xs font-black uppercase">{article.category}</span>
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-[#E00A0A] group-hover:text-white"><ChevronLeft size={16} /></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {data.pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-20">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="p-4 rounded-2xl bg-white border border-slate-200 disabled:opacity-20 hover:bg-[#E00A0A] hover:text-white shadow-sm"><ChevronRight size={20} /></button>
                <div className="flex gap-2 font-latin">
                  {[...Array(data.pagination.totalPages)].map((_, i) => (
                    <button key={i + 1} onClick={() => handlePageChange(i + 1)} className={`w-12 h-12 rounded-2xl border-2 transition-all font-bold ${currentPage === i + 1 ? 'bg-[#E00A0A] border-[#E00A0A] text-white shadow-lg' : 'bg-white border-slate-100 text-slate-500 hover:border-[#E00A0A]'}`}>{i + 1}</button>
                  ))}
                </div>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === data.pagination.totalPages} className="p-4 rounded-2xl bg-white border border-slate-200 disabled:opacity-20 hover:bg-[#E00A0A] hover:text-white shadow-sm"><ChevronLeft size={20} /></button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}