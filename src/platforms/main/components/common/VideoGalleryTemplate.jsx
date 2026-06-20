import React, { useState, useEffect } from "react";
import { Play, X, Loader2, ChevronRight, ChevronLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { getVideosByChannel } from "@shared/services/api";
import HeaderSection from "@main/components/common/HeaderSection";

export default function VideoGalleryTemplate({
  channelName,
  pageTitle,
  pageSubtitle,
  helmetTitle,
  bgColor = "bg-[#ffeeee]",
}) {
  const [allVideos, setAllVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 9;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await getVideosByChannel(channelName);
        setAllVideos(data);
      } catch (error) {
        console.error(`Erreur chargement vidéos ${channelName}:`, error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [channelName]);

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = allVideos.slice(indexOfFirstVideo, indexOfLastVideo);
  const totalPages = Math.ceil(allVideos.length / videosPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`${bgColor} min-h-screen pb-20 font-arabic`} dir="rtl">
      <Helmet>
        <title>{helmetTitle} - نفزاوة</title>
      </Helmet>

      <HeaderSection title={pageTitle} subtitle={pageSubtitle} />

      <div className="container mx-auto px-4 mt-12">
        {loading ? (
          <div className="flex justify-center py-40">
            <Loader2 className="animate-spin text-[#E00A0A]" size={48} />
          </div>
        ) : allVideos.length === 0 ? (
          <div className="text-center py-40 text-slate-500">
            لا توجد فيديوهات حالياً في {pageTitle}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {currentVideos.map((video) => (
                <div
                  key={video.id}
                  className="group cursor-pointer"
                  onClick={() => setSelectedVideo(video.youtubeId)}
                >
                  <div className="relative aspect-video rounded-[2rem] overflow-hidden border-2 border-white group-hover:border-[#E00A0A] transition-all duration-500 shadow-lg">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-16 h-16 bg-[#E00A0A] rounded-full flex items-center justify-center shadow-xl transform group-hover:scale-125 transition-transform duration-300">
                        <Play
                          fill="white"
                          className="text-white ml-1"
                          size={24}
                        />
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-950 text-right leading-tight line-clamp-2 group-hover:text-[#E00A0A] transition-colors">
                    {video.title}
                  </h3>
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div
                className="flex justify-center items-center gap-3 mt-16"
                dir="rtl"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-3 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-30 hover:bg-[#E00A0A] hover:text-white transition-all shadow-sm"
                >
                  <ChevronRight size={20} />
                </button>
                <div className="flex gap-2 font-latin">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`w-10 h-10 rounded-xl border-2 transition-all font-bold ${currentPage === i + 1 ? "bg-[#E00A0A] border-[#E00A0A] text-white" : "bg-white border-slate-100 text-slate-500 hover:border-[#E00A0A]"}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-30 hover:bg-[#E00A0A] hover:text-white transition-all shadow-sm"
                >
                  <ChevronLeft size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* MODAL */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-sm"
            onClick={() => setSelectedVideo(null)}
          ></div>
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-50 p-2 bg-white/10 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X size={24} />
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              title="Video Player"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
