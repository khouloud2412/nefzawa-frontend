import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import HeaderSection from '@main/components/common/HeaderSection';
import TitreNefzawa from '@main/components/ui/TitreNefzawa';
import { X, Expand, Users2, Target, Zap, Shield } from 'lucide-react';

// Import de l'image
import organigramImg from '@assets/images/nefzawa-images/organigramme.webp';

// Données de l'équipe 


const TEAM_DATA = [
  {
    name: "أحمد العامري",
    role: "مدير البرامج والعمليات",
    borderClass: "border-slate-800",
    hoverBorder: "hover:border-slate-800",
    bgLight: "bg-slate-100",
    indicator: "bg-slate-800",
    shadowHover: "hover:shadow-slate-200"
  },
  {
    name: "وفاء معالي",
    role: "مسؤولة الموارد البشرية",
    borderClass: "border-[#4CAF50]",
    hoverBorder: "hover:border-[#4CAF50]",
    bgLight: "bg-green-50",
    indicator: "bg-[#4CAF50]",
    shadowHover: "hover:shadow-green-100"
  },
  {
    name: "مبروكة جابالله",
    role: "مسؤولة التحرير والبرمجية",
    borderClass: "border-[#FF9800]",
    hoverBorder: "hover:border-[#FF9800]",
    bgLight: "bg-orange-50",
    indicator: "bg-[#FF9800]",
    shadowHover: "hover:shadow-orange-100"
  },
  {
    name: "زهيرة الجبالي",
    role: "مسؤولة المالية والمحاسبة",
    borderClass: "border-[#9C27B0]",
    hoverBorder: "hover:border-[#9C27B0]",
    bgLight: "bg-purple-50",
    indicator: "bg-[#9C27B0]",
    shadowHover: "hover:shadow-purple-100"
  },
  {
    name: "يامنة رطيب",
    role: "مسؤولة التطوير والاستمرارية",
    borderClass: "border-[#E91E63]",
    hoverBorder: "hover:border-[#E91E63]",
    bgLight: "bg-pink-50",
    indicator: "bg-[#E91E63]",
    shadowHover: "hover:shadow-pink-100"
  },
  {
    name: "مجدي دراويل",
    role: "مسؤول العمليات التقنية",
    borderClass: "border-[#2196F3]",
    hoverBorder: "hover:border-[#2196F3]",
    bgLight: "bg-blue-50",
    indicator: "bg-[#2196F3]",
    shadowHover: "hover:shadow-blue-100"
  },
  {
    name: "خلود صميدة",
    role: "مسؤولة الويب والمنصات الرقمية",
    borderClass: "border-[#00BCD4]",
    hoverBorder: "hover:border-[#00BCD4]",
    bgLight: "bg-cyan-50",
    indicator: "bg-[#00BCD4]",
    shadowHover: "hover:shadow-cyan-100"
  }
];

export default function OrganigramPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-[#fafafa] min-h-screen pb-32 font-arabic" dir="rtl">
      <Helmet>
        <title>الهيكل التنظيمي - منظمة نفزاوة</title>
      </Helmet>

      <HeaderSection title="الهيكل التنظيمي" subtitle="تعرفوا على البنية التنظيمية لنفزاوة" />

      <div className="container mx-auto px-4 relative z-10 -mt-16">
        
        {/* --- SECTION 1 : LES CLÉS DU FONCTIONNEMENT --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
           <div className="bg-white p-8 rounded-[2rem] shadow-sm border-b-4 border-[#e00a0a] flex flex-col items-center text-center">
              <Users2 className="text-[#e00a0a] mb-4" size={40} />
              <h4 className="text-xl font-bold mb-2">تعاون مشترك</h4>
              <p className="text-slate-500 text-sm">التنسيق الفعال بين مختلف الأقسام لضمان جودة الأداء</p>
           </div>
           <div className="bg-white p-8 rounded-[2rem] shadow-sm border-b-4 border-[#e00a0a] flex flex-col items-center text-center">
              <Zap className="text-[#e00a0a] mb-4" size={40} />
              <h4 className="text-xl font-bold mb-2">متابعة الأداء</h4>
              <p className="text-slate-500 text-sm">متابعة مستمرة للمؤشرات لضمان تحقيق الأهداف المحددة</p>
           </div>
           <div className="bg-white p-8 rounded-[2rem] shadow-sm border-b-4 border-[#e00a0a] flex flex-col items-center text-center">
              <Shield className="text-[#e00a0a] mb-4" size={40} />
              <h4 className="text-xl font-bold mb-2">استقلالية المهام</h4>
              <p className="text-slate-500 text-sm">هيكلة تنظيمية دقيقة تضمن تنسيقاً فعالاً وتكاملاً بين مختلف الأقسام</p>
           </div>
        </div>

        {/* --- SECTION 2 : L'IMAGE DE L'ORGANIGRAMME --- */}
        <div className="max-w-6xl mx-auto mb-32">
          <TitreNefzawa title="مخطط" coloredPart="الهيكلة" center={true} />
          <div 
            className="relative mt-12 cursor-zoom-in group"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-slate-200 to-transparent rounded-[3rem] blur-2xl opacity-50"></div>
            <div className="relative bg-white p-4 rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
               <img src={organigramImg} alt="Organigramme Nefzawa" className="w-full h-auto rounded-2xl" />
               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <Expand className="text-[#DF0A0A]" size={28} />
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 3 : CHROMA GRID (L'ÉQUIPE) --- */}
        <div className="max-w-6xl mx-auto">
        {/* <TitreNefzawa title="المكتب التنفيذي" coloredPart="لنفزاوة" center={true} />*/} 
          
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
  {TEAM_DATA.map((member, index) => (
    <div 
      key={index} 
      className={`group relative bg-[#e00a0a0d] rounded-[2.5rem] p-8 text-center border-2 border-transparent transition-all duration-500 hover:-translate-y-2 ${member.hoverBorder} ${member.shadowHover} shadow-xl shadow-slate-100/50`}
    >
      {/* Avatar Placeholder */}
      <div className={`w-24 h-24 mx-auto rounded-full mb-6 p-1 border-2 ${member.borderClass}`}>
         <div className={`w-full h-full rounded-full ${member.bgLight} flex items-center justify-center`}>
            <Users2 className="text-slate-400 opacity-50" size={32} />
         </div>
      </div>

      <h3 className="text-xl font-black text-slate-900 mb-2">{member.name}</h3>
      <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">{member.role}</p>

      {/* Petit indicateur coloré en bas de la carte */}
      <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full ${member.indicator}`}></div>
    </div>
  ))}
</div>
        </div>

      </div>

      {/* MODAL ZOOM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md" onClick={() => setIsModalOpen(false)}>
          <button className="absolute top-6 right-6 text-white hover:text-[#DF0A0A] transition-colors"><X size={40} /></button>
          <img src={organigramImg} alt="Zoom" className="max-w-full max-h-full object-contain" />
        </div>
      )}
    </div>
  );
}