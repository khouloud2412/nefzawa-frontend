export const NavLinks = [
  {
    id: 1,
    name: "الرئيسية",
    path: "/" 
  },
  {
    id: 2,
    name: "المؤسسة",
    submenu: [
      { id: 21, name: "تاريخ نفزاوة", path: "/HistoryPage" },
      { id: 22, name: "مواثيق وضوابط", path: "/MawathikThawabet" },
      { id: 23, name: "رؤية نفزاوة", path: "/VisionNefzawa" },
      { id: 24, name: "الهيكل التنظيمي", path: "/OrganigramPage" },
    ]
  },
  {
    id: 3,
    name: "الإذاعة",
    submenu: [
      { id: 31, name: "من نحن", path: "/RadioPresentation" },
      { id: 32, name: "تاريخ الاذاعة", path: "/RadioHistory" }, 
      { id: 33, name: "الموفق الاعلامي", path: "/MouwafakAalami" }, 
    ]
  },
  {
    id: 4,
    name: "الأخبار",
    submenu: [
      { id: 41, name: "أخبار قبلي", path: "/news/أخبار قبلي" }, 
      { id: 42, name: "الأخبار الوطنية", path: "/news/الأخبار الوطنية" },
      { id: 43, name: "الأخبار العالمية", path: "/news/الأخبار العالمية" },
      { id: 44, name: "الأخبار الرياضية", path: "/news/الأخبار الرياضية" },
    ]
  },
  {
    id: 5,
        name: "شاهد على نفزاوة",
        submenu: [
      { id: 51, name: "نفزاوة تيفي", path: "/nefzawa-tv" }, 
      { id: 52, name: "ألو نفزاوة", path: "/alou-nefzawa" },
        ]
  },
  {
    id: 6,
    name: "المزيد",
    submenu: [
      { id: 61, name: "عروضنا", path: "/news/عروضنا" },
      { id: 62, name: "دراسات و بحوث", path: "/news/دراسات و بحوث" },
      {
        id: 63,
        name: "منصاتنا",
        
        submenu: [
          { id: 631, name: "نفزاوة سيتي", path: "/platforms/city" },
          { id: 632, name: "الأكاديمية", path: "/platforms/academy" },
          { id: 633, name: "المجمع", path: "/platforms/group" },
          { id: 634, name: "الصوت الذهبي", path: "/platforms/voice" },
          { id: 635, name: "تصحيح", path: "/platforms/check" },
          { id: 636, name: "حوش النخلة", path: "/platforms/hoosh" },
        ]
      },
      {
        id: 64,
        name: "مباشر",
        submenu: [
          { id: 641, name: "مباشر أوديو", path: "/LiveAudioPage" },
          { id: 642, name: "مباشر فيديو", path: "/LiveVideoPage" },
        ]
      },
      { id: 65, name: "اتصل بنا", path: "/ContactPage" }, 
    ]
  },
];