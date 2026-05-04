import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getArticleBySlug, getArticlesByCategory } from '../services/api'; 
import { Calendar, User, Share2, Check, ChevronRight, Download } from 'lucide-react';

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: article?.title, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
      }
    } catch { /* ignored */ }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadContent = async () => {
      setLoading(true);
      try {
        const articleData = await getArticleBySlug(slug);
        if (articleData) {
          setArticle(articleData);
          const categoryRes = await getArticlesByCategory(articleData.category, 1, 6);
          const filtered = (categoryRes.articles || []).filter(a => a.id !== articleData.id);
          setRelatedNews(filtered.slice(0, 5));
        }
      } catch { setLoading(false); } finally { setLoading(false); }
    };
    loadContent();
  }, [slug]);

  if (loading) return <div className="py-40 text-center font-arabic text-slate-400 animate-pulse">جاري التحميل...</div>;
  if (!article) return <div className="py-40 text-center font-arabic text-red-500">المقال غير موجود</div>;

  const cleanURL = (text) => text.trim().replace(/\s+/g, '-');

  return (
    <div className="bg-white min-h-screen pb-24 font-arabic" dir="rtl">
      <Helmet><title>{article.title} - نفزاوة</title></Helmet>
      <div className="container mx-auto px-4 max-w-7xl">
        <nav className="flex items-center gap-2 py-8 text-sm text-slate-400">
          <Link to="/" className="hover:text-[#E00A0A] transition-colors">الرئيسية</Link><ChevronRight size={14} />
          <Link to={`/news/${article.category}`} className="hover:text-[#E00A0A] transition-colors">{article.category}</Link>
        </nav>
        <div className="flex flex-col lg:flex-row gap-12">
          <main className="lg:w-2/3">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-6">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-slate-500 text-sm mb-8 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-2"><User size={16} /><span className="font-bold">{article.author}</span></div>
              <div className="flex items-center gap-2"><Calendar size={16} /><span>{article.date}</span></div>
            </div>
            <div className="relative mb-10 overflow-hidden rounded-3xl shadow-sm border border-slate-100"><img src={article.image} alt={article.title} className="w-full h-auto max-h-[500px] object-cover" /></div>
            <div className="article-content text-lg md:text-xl text-slate-800 leading-[2.1] text-justify space-y-6" dangerouslySetInnerHTML={{ __html: article.content }} />
            <div className="mt-16 p-8 bg-slate-50 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-100">
              <span className="font-bold text-slate-700">هل أعجبك هذا المقال؟ شاركه مع الآخرين:</span>
              <button onClick={handleShare} className="flex items-center gap-3 px-8 py-3 bg-[#E00A0A] text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg">
                {isCopied ? <Check size={20} /> : <Share2 size={20} />} {isCopied ? "تم النسخ" : "مشاركة الآن"}
              </button>
            </div>
          </main>
          <aside className="lg:w-1/3">
            <div className="sticky top-24 space-y-8">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3"><span className="w-2 h-8 bg-[#E00A0A] rounded-full"></span>المزيد في {article.category}</h3>
                <div className="space-y-6">
                  {relatedNews.map(item => (
                    <Link key={item.id} to={`/article/${cleanURL(item.category)}/${item.slug}`} className="flex gap-4 group">
                      <div className="w-24 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100"><img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /></div>
                      <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#E00A0A] transition-colors line-clamp-2 leading-snug">{item.title}</h4>
                    </Link>
                  ))}
                </div>
              </div>
              {/* WIDGET APPLICATION */}
              <div className="bg-zinc-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                <div className="w-12 h-12 bg-[#E00A0A] rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-red-600/20"><Download size={24} /></div>
                <h4 className="text-2xl font-black mb-3">تطبيق نفزاوة</h4>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">تابع آخر الأخبار العاجلة والبث الإذاعي والبرامج المباشرة عبر تطبيقنا الرسمي.</p>
                <a href="https://play.google.com/store/apps/details?id=io.nefzawa.starter" target="_blank" rel="noreferrer" className="inline-flex w-full justify-center py-4 bg-white text-black rounded-2xl font-black hover:bg-[#E00A0A] hover:text-white transition-all">تحميل التطبيق</a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}