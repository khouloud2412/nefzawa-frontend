import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import HeaderSection from "@main/components/common/HeaderSection";
import {
  Tv,
  Share2,
  Smartphone,
  Download,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";
import AdBanner from "@main/components/ui/AdBanner";

// --- CONFIGURATION ---
const TWITCH_CHANNEL = "nefzawa";

// --- SVGS ---
const SocialIcon = ({ d }) => (
  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
    <path d={d} />
  </svg>
);
const FB_PATH =
  "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z";
const INSTA_PATH =
  "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z";
const TIKTOK_PATH =
  "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z";
const YT_PATH =
  "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z";
const LINKEDIN_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";
const DM_PATH =
  "M21.823 7.327a11.928 11.928 0 0 0-2.606-3.814 12.126 12.126 0 0 0-3.866-2.57A12.246 12.246 0 0 0 10.617 0H1.831a.602.602 0 0 0-.609.603v3.764c0 .162.064.312.179.426l4.164 4.123a.612.612 0 0 0 .439.177h4.56c.806 0 1.56.313 2.125.88.557.559.856 1.296.843 2.075-.029 1.571-1.343 2.849-2.931 2.849h-6.74a.613.613 0 0 0-.432.176.619.619 0 0 0-.178.427v3.764c0 .162.063.312.178.427l4.139 4.099a.647.647 0 0 0 .476.21h2.572a12.276 12.276 0 0 0 4.733-.945 12.145 12.145 0 0 0 3.866-2.571 11.959 11.959 0 0 0 2.607-3.813c.633-1.479.956-3.051.956-4.67 0-1.619-.321-3.19-.956-4.669l.001-.005ZM2.441 4.118V1.982l2.945 2.755.001 2.297-2.946-2.916Zm4.975 17.813-2.945-2.917v-2.137l2.945 2.755v2.299Zm-2.004-5.832h5.19c2.248 0 4.107-1.807 4.147-4.03a4.027 4.027 0 0 0-1.192-2.937 4.203 4.203 0 0 0-2.996-1.239H6.606V5.216h3.996c1.831 0 3.553.706 4.849 1.986a6.724 6.724 0 0 1-.152 9.736 6.875 6.875 0 0 1-4.697 1.84H8.275L5.412 16.1v-.001Zm15.289.1a10.753 10.753 0 0 1-2.345 3.431 10.91 10.91 0 0 1-3.48 2.314 11.018 11.018 0 0 1-4.26.847H8.633v-2.814h1.916c2.145 0 4.161-.802 5.675-2.254a7.88 7.88 0 0 0 2.451-5.728c0-2.177-.87-4.21-2.451-5.728-1.514-1.454-3.528-2.254-5.675-2.254h-4.16L3.383 1.202h7.234c1.479 0 2.911.285 4.259.847a10.957 10.957 0 0 1 3.48 2.313 10.769 10.769 0 0 1 2.345 3.432c.571 1.33.86 2.743.86 4.202 0 1.46-.289 2.873-.86 4.203Z";

export default function LiveVideoPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  // LOGIQUE TECHNIQUE : Autoriser les domaines pour éviter l'écran noir Twitch
  const parentParams =
    "&parent=localhost&parent=nefzawa.net&parent=www.nefzawa.net";
  const twitchUrl = `https://player.twitch.tv/?channel=${TWITCH_CHANNEL}${parentParams}&autoplay=true&muted=false`;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Nefzawa TV - Live",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
      }
    } catch {
      /* Correction de l'erreur ESLint : le bloc n'est plus vide et la variable inutilisée est supprimée */
    }
  };

  // --- TON CONTENU ORIGINAL (TEXTE ET DESIGN) ---
  return (
    <div
      className="bg-[#050505] min-h-screen pb-32 font-arabic text-white"
      dir="rtl"
    >
      <Helmet>
        <title>نفزاوة TV | البث المباشر الميداني</title>
        <meta
          name="description"
          content="شاهدوا البث المباشر لقناة نفزاوة TV. تغطية حية للأخبار والفعاليات في الجنوب التونسي وبث مباشر للبرامج الميدانية."
        />
      </Helmet>

      <HeaderSection
        title="البثّ المباشر بالفيديو"
        subtitle="تابعنا صوتًا وصورةً"
        dark={true}
      />

      <div className="container mx-auto px-4 -mt-16 relative z-10">
        {/* --- PUB LIVE TOP --- */}
        <AdBanner slot="6718596405" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* --- MAIN PLAYER COLUMN --- */}
          <main className="lg:col-span-8 space-y-8">
            <div className="bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl relative">
              {/* Status Header */}
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
                <h1 className="text-xl font-black flex items-center gap-3">
                  <Tv size={24} className="text-[#E00A0A]" />
                  البث المباشر
                </h1>
                <div className="flex items-center gap-2 px-3 py-1 bg-red-600 rounded-full animate-pulse shadow-lg shadow-red-600/20">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  <span className="text-[10px] font-bold uppercase font-latin">
                    Live
                  </span>
                </div>
              </div>

              {/* Twitch Player with Loading State */}
              <div className="relative aspect-video w-full bg-black">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-950 z-10">
                    <Loader2
                      className="animate-spin text-[#E00A0A]"
                      size={48}
                    />
                  </div>
                )}
                {/* L'iframe utilise maintenant twitchUrl qui contient les parents autorisés */}
                <iframe
                  src={twitchUrl}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen={true}
                  onLoad={() => setIsLoading(false)}
                  title="Nefzawa Live Stream"
                ></iframe>
              </div>

              {/* Player Fallback / Footer */}
              <div className="p-8 text-center md:text-right border-t border-white/5">
                <p className="text-zinc-400 text-sm mb-0">
                  في حال عدم ظهور البث، يرجى تحديث الصفحة أو تعطيل مانع
                  الإعلانات
                </p>
              </div>
            </div>

            {/* --- SEO EDITORIAL CONTENT --- */}
            <article className="bg-white/5 border border-white/5 rounded-[3rem] p-8 md:p-12 space-y-6">
              <h2 className="text-2xl md:text-3xl font-black border-r-4 border-[#E00A0A] pr-4">
                البثّ المباشر لإذاعة نفزاوة FM
              </h2>

              <div className="text-zinc-300 leading-[2] text-lg space-y-4">
                <p>
                  يوفّر هذا القسم خدمة البثّ المباشر المرئي لإذاعة نفزاوة FM،
                  حيث يمكن للمتابعين مشاهدة البرامج الإذاعية مباشرةً بصيغة فيديو
                  مع جودة عالية وصوت واضح، من قلب الأستوديو.
                </p>

                <p>
                  يهدف البثّ المباشر إلى تمكين الجمهور من متابعة البرامج
                  الإذاعية لحظة بلحظة، بما في ذلك النشرات الإخبارية، البرامج
                  الحوارية، والتغطيات الميدانية التي تقدمها إذاعة نفزاوة FM في
                  الجنوب التونسي.{" "}
                </p>

                <p>
                  يُعدّ هذا الفضاء جزءًا من تطوير الإعلام الرقمي في تونس، من
                  خلال دمج البث الإذاعي التقليدي مع تقنيات البث المرئي المباشر،
                  لتقديم تجربة متابعة حديثة وتفاعلية للمستخدمين.{" "}
                </p>

                <p>
                  تابعوا إذاعة نفزاوة FM مباشرة عبر هذا البثّ الحي، وابقوا على
                  اطلاع دائم بأحدث البرامج والمحتوى الإعلامي المحلي والجهوي في
                  أي وقت ومن أي مكان.{" "}
                </p>
              </div>
            </article>

            {/* Availability Alert */}
            <div className="p-6 bg-red-600/10 border border-red-600/20 rounded-3xl flex items-center gap-4">
              <AlertCircle className="text-[#E00A0A] flex-shrink-0" size={24} />
              <p className="text-sm text-red-200">
                البثّ المباشر مخصّص لبثّ برامجنا الإذاعية بشكل مباشر لمتابعتنا
                صوتًا وصورة. وفي حال عدم توفر بثّ مباشر حاليًا، يمكنكم زيارة
                صفحتنا على فيسبوك للاطلاع على جميع الفيديوهات السابقة.
              </p>
            </div>
          </main>

          {/* --- SIDEBAR --- */}
          <aside className="lg:col-span-4 space-y-6">
            {/* --- PUB LIVE SIDEBAR --- */}
            <AdBanner slot="8658364032" format="rectangle" />

            {/* Widget 1: App */}
            <div className="bg-zinc-900/50 border border-white/10 rounded-[2.5rem] p-8 text-center shadow-xl">
              <Smartphone size={32} className="text-[#E00A0A] mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-2 text-right">
                تطبيق نفزاوة
              </h3>
              <p className="text-zinc-500 text-sm mb-6 text-right leading-relaxed">
                تابع البث المرئي والمسموع في أي وقت عبر تطبيقنا الرسمي
              </p>
              <a
                href="https://play.google.com/store/apps/details?id=io.nefzawa.starter"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#E00A0A] hover:text-white transition-all"
              >
                <Download size={20} /> تحميل التطبيق
              </a>
            </div>

            {/* Widget 2: Social */}
            <div className="bg-zinc-900/50 border border-white/10 rounded-[2.5rem] p-8 shadow-xl">
              <h3 className="text-lg font-bold mb-6 text-center text-zinc-300">
                منصاتنا الرقمية
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <a
                  href="https://www.facebook.com/Nefzaawa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-square bg-slate-800 rounded-2xl flex justify-center items-center text-white hover:bg-blue-600 transition-all"
                >
                  <SocialIcon d={FB_PATH} />
                </a>
                <a
                  href="https://www.instagram.com/nefzawa_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-square bg-slate-800 rounded-2xl flex justify-center items-center text-white hover:bg-pink-600 transition-all"
                >
                  <SocialIcon d={INSTA_PATH} />
                </a>
                <a
                  href="https://www.tiktok.com/@nefzawa_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-square bg-slate-800 rounded-2xl flex justify-center items-center text-white hover:bg-black transition-all"
                >
                  <SocialIcon d={TIKTOK_PATH} />
                </a>
                <a
                  href="https://www.youtube.com/@nefzawa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-square bg-slate-800 rounded-2xl flex justify-center items-center text-white hover:bg-red-600 transition-all"
                >
                  <SocialIcon d={YT_PATH} />
                </a>
                <a
                  href="https://www.linkedin.com/company/nefzawa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-square bg-slate-800 rounded-2xl flex justify-center items-center text-white hover:bg-blue-700 transition-all"
                >
                  <SocialIcon d={LINKEDIN_PATH} />
                </a>
                <a
                  href="https://www.dailymotion.com/user/nefzawa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-square bg-slate-800 rounded-2xl flex justify-center items-center text-white hover:bg-blue-500 transition-all"
                >
                  <SocialIcon d={DM_PATH} />
                </a>
              </div>
            </div>

            {/* Widget 3: Share */}
            <div className="bg-[#E00A0A] rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
              <Share2 className="absolute -bottom-4 -left-4 size-32 opacity-10 group-hover:rotate-12 transition-transform duration-700" />
              <h3 className="text-xl font-bold mb-4 relative z-10 text-right">
                شارك البث
              </h3>
              <button
                onClick={handleShare}
                className="w-full py-4 bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-black transition-all relative z-10 text-white"
              >
                {isCopied ? (
                  <Check size={22} className="text-green-400" />
                ) : (
                  <Share2 size={22} />
                )}
                {isCopied ? "تم نسخ الرابط" : "مشاركة الآن"}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
