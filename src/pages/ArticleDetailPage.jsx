import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getArticleBySlug, getArticlesByCategory } from '../services/api'; 
import { Calendar, User, Share2, Check, ChevronRight, Download } from 'lucide-react';

// --- ICONES RÉSEAUX SOCIAUX (SVG Officiels) ---
const SocialIcon = ({ d, size = "w-5 h-5", colorClass = "group-hover:text-white" }) => (
  <svg className={`${size} fill-current transition-colors duration-300 ${colorClass}`} viewBox="0 0 24 24">
    <path d={d} />
  </svg>
);

const FB_PATH = "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z";
const INSTA_PATH = "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z";
const TIKTOK_PATH = "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z";
const YT_PATH = "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z";
const LINKEDIN_PATH = "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";
const DM_PATH = "M21.823 7.327a11.928 11.928 0 0 0-2.606-3.814 12.126 12.126 0 0 0-3.866-2.57A12.246 12.246 0 0 0 10.617 0H1.831a.602.602 0 0 0-.609.603v3.764c0 .162.064.312.179.426l4.164 4.123a.612.612 0 0 0 .439.177h4.56c.806 0 1.56.313 2.125.88.557.559.856 1.296.843 2.075-.029 1.571-1.343 2.849-2.931 2.849h-6.74a.613.613 0 0 0-.432.176.619.619 0 0 0-.178.427v3.764c0 .162.063.312.178.427l4.139 4.099a.647.647 0 0 0 .476.21h2.572a12.276 12.276 0 0 0 4.733-.945 12.145 12.145 0 0 0 3.866-2.571 11.959 11.959 0 0 0 2.607-3.813c.633-1.479.956-3.051.956-4.67 0-1.619-.321-3.19-.956-4.669l.001-.005ZM2.441 4.118V1.982l2.945 2.755.001 2.297-2.946-2.916Zm4.975 17.813-2.945-2.917v-2.137l2.945 2.755v2.299Zm-2.004-5.832h5.19c2.248 0 4.107-1.807 4.147-4.03a4.027 4.027 0 0 0-1.192-2.937 4.203 4.203 0 0 0-2.996-1.239H6.606V5.216h3.996c1.831 0 3.553.706 4.849 1.986a6.724 6.724 0 0 1-.152 9.736 6.875 6.875 0 0 1-4.697 1.84H8.275L5.412 16.1v-.001Zm15.289.1a10.753 10.753 0 0 1-2.345 3.431 10.91 10.91 0 0 1-3.48 2.314 11.018 11.018 0 0 1-4.26.847H8.633v-2.814h1.916c2.145 0 4.161-.802 5.675-2.254a7.88 7.88 0 0 0 2.451-5.728c0-2.177-.87-4.21-2.451-5.728-1.514-1.454-3.528-2.254-5.675-2.254h-4.16L3.383 1.202h7.234c1.479 0 2.911.285 4.259.847a10.957 10.957 0 0 1 3.48 2.313 10.769 10.769 0 0 1 2.345 3.432c.571 1.33.86 2.743.86 4.202 0 1.46-.289 2.873-.86 4.203Z";

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  // --- LOGIQUE DE PARTAGE ---
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: article?.title, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
      }
    } catch { /* Ignored */ }
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=600,height=400');
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
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
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
        {/* Fil d'Ariane */}
        <nav className="flex items-center gap-2 py-8 text-sm text-slate-400">
          <Link to="/" className="hover:text-[#E00A0A] transition-colors">الرئيسية</Link>
          <ChevronRight size={14} />
          <Link to={`/news/${article.category}`} className="hover:text-[#E00A0A] transition-colors">{article.category}</Link>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* --- CONTENU PRINCIPAL --- */}
          <main className="lg:w-2/3">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-6">{article.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-slate-500 text-sm mb-8 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span className="font-bold">{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{article.date}</span>
              </div>
            </div>

            <div className="relative mb-10 overflow-hidden rounded-3xl shadow-sm border border-slate-100 bg-slate-50">
              <img src={article.image} alt={article.title} className="w-full h-auto max-h-[550px] object-cover" />
            </div>

            <div className="article-content text-lg md:text-xl text-slate-800 leading-[2.1] text-justify space-y-6 mb-16" 
                 dangerouslySetInnerHTML={{ __html: article.content }} 
            />

            {/* --- ZONE DE PARTAGE BAS DE PAGE --- */}
            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
              <h4 className="text-xl font-bold text-slate-900 mb-6">هل أعجبك المقال؟ شاركه مع أصدقائك</h4>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={shareToFacebook}
                  className="flex-1 flex items-center justify-center gap-3 py-4 bg-[#1877F2] text-white rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg shadow-blue-200"
                >
                  <SocialIcon d={FB_PATH} size="w-5 h-5" />
                  فيسبوك
                </button>
                <button 
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-3 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg"
                >
                  {isCopied ? <Check size={20} className="text-green-400" /> : <Share2 size={20} />}
                  {isCopied ? "تم نسخ الرابط" : "مشاركة الرابط"}
                </button>
              </div>
            </div>
          </main>

          {/* --- SIDEBAR --- */}
          <aside className="lg:w-1/3">
            <div className="sticky top-24 space-y-8">
              
              {/* Widget 1: Articles liés */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-[#E00A0A] rounded-full"></span>
                 آخر {article.category}
                </h3>
                <div className="space-y-6">
                  {relatedNews.map(item => (
                    <Link key={item.id} to={`/article/${cleanURL(item.category)}/${item.slug}`} className="flex gap-4 group">
                      <div className="w-24 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 shadow-inner">
                        <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#E00A0A] transition-colors line-clamp-2 leading-snug">{item.title}</h4>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Widget 2: Plateformes Numériques */}
<div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative group/widget">
  {/* Décoration de fond discrète */}
  <div className="absolute -top-10 -right-10 w-32 h-32 bg-slate-50 rounded-full blur-3xl group-hover/widget:bg-red-50 transition-colors duration-700"></div>

  <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 relative z-10">
    <span className="w-1.5 h-6 bg-[#E00A0A] rounded-full"></span>
    منصاتنا الرقمية
  </h3>

  <div className="grid grid-cols-3 gap-4 relative z-10">
    {/* FACEBOOK */}
    <a href="https://www.facebook.com/Nefzaawa" target="_blank" rel="noreferrer" 
       className="group aspect-square bg-slate-50 rounded-2xl flex justify-center items-center text-slate-400 hover:bg-[#1877F2] hover:shadow-lg hover:shadow-blue-200 transition-all duration-300">
      <SocialIcon d={FB_PATH} />
    </a>

    {/* INSTAGRAM */}
    <a href="https://www.instagram.com/nefzawa_" target="_blank" rel="noreferrer" 
       className="group aspect-square bg-slate-50 rounded-2xl flex justify-center items-center text-slate-400 hover:bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:shadow-lg transition-all duration-300">
      <SocialIcon d={INSTA_PATH} />
    </a>

    {/* TIKTOK */}
    <a href="https://www.tiktok.com/@nefzawa_" target="_blank" rel="noreferrer" 
       className="group aspect-square bg-slate-50 rounded-2xl flex justify-center items-center text-slate-400 hover:bg-black hover:shadow-lg transition-all duration-300">
      <SocialIcon d={TIKTOK_PATH} />
    </a>

    {/* YOUTUBE */}
    <a href="https://www.youtube.com/@nefzawa" target="_blank" rel="noreferrer" 
       className="group aspect-square bg-slate-50 rounded-2xl flex justify-center items-center text-slate-400 hover:bg-[#FF0000] hover:shadow-lg hover:shadow-red-100 transition-all duration-300">
      <SocialIcon d={YT_PATH} />
    </a>

    {/* LINKEDIN */}
    <a href="https://www.linkedin.com/company/nefzawa" target="_blank" rel="noreferrer" 
       className="group aspect-square bg-slate-50 rounded-2xl flex justify-center items-center text-slate-400 hover:bg-[#0A66C2] hover:shadow-lg transition-all duration-300">
      <SocialIcon d={LINKEDIN_PATH} />
    </a>

    {/* DAILYMOTION */}
    <a href="https://www.dailymotion.com/user/nefzawa" target="_blank" rel="noreferrer" 
       className="group aspect-square bg-slate-50 rounded-2xl flex justify-center items-center text-slate-400 hover:bg-[#0062ff] hover:shadow-lg transition-all duration-300">
      <SocialIcon d={DM_PATH} />
    </a>
  </div>
</div>

              {/* Widget 3: Application */}
              <div className="bg-zinc-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                <Download className="absolute -bottom-4 -left-4 size-24 opacity-10 group-hover:rotate-12 transition-transform duration-700" />
                <div className="w-12 h-12 bg-[#E00A0A] rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-red-600/20"><Download size={24} /></div>
                <h4 className="text-2xl font-black mb-3 text-right">تطبيق نفزاوة</h4>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed text-right">تابع آخر الأخبار العاجلة والبث الإذاعي والبرامج المباشرة عبر تطبيقنا الرسمي.</p>
                <a href="https://play.google.com/store/apps/details?id=io.nefzawa.starter" target="_blank" rel="noreferrer" className="inline-flex w-full justify-center py-4 bg-white text-black rounded-2xl font-black hover:bg-[#E00A0A] hover:text-white transition-all relative z-10">تحميل التطبيق</a>
              </div>

            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}