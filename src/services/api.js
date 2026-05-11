import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://www.nefzawa.net/api';
const SERVER_URL = BASE_URL.replace('/api', '');

const api = axios.create({ baseURL: BASE_URL });

const formatImageUrl = (url) => {
  if (!url) return 'https://via.placeholder.com/800x450?text=Nefzawa+Media';
  if (url.startsWith('http')) return url;
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return `${SERVER_URL}${cleanPath}`;
};

export const extractYoutubeId = (url) => {
  if (!url || typeof url !== 'string') return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const mapArticle = (item) => {
  const isBadSlug = !item.slug || item.slug.length < 3 || /^-?\d+$/.test(item.slug);
  const finalSlug = isBadSlug ? item._id : item.slug;

  return {
    id: item._id,
    title: item.title,
    slug: finalSlug,
    image: formatImageUrl(item.imageUrl),
    category: item.category || "عام",
    language: item.language || "ar", // ✅ Détecte si 'fr', 'en' ou 'ar'
    date: item.createdAt ? new Date(item.createdAt).toLocaleDateString('fr-FR') : "00/00/0000",
    createdAt: item.createdAt,
    content: item.content,
    excerpt: item.summary || "",
    isFeatured: item.is_star || false,
    author: item.author || "فريق نفزاوة",
    gallery: (item.gallery || []).map(img => formatImageUrl(img)),
    audios: (item.audios || []).map(audio => ({ ...audio, url: formatImageUrl(audio.url) })),
    pdfs: (item.pdfs || []).map(pdf => ({ ...pdf, url: formatImageUrl(pdf.url) })),
    videos: (item.videos || []).map(video => ({ ...video, url: formatImageUrl(video.url) })),
    tags: item.tags || []
  };
};

export const getArticleBySlug = async (slugOrId) => {
  try {
    const response = await api.get(`/articles/slug/${encodeURIComponent(slugOrId)}`);
    return mapArticle(response.data);
  } catch { // ✅ Retrait de 'err' pour corriger VS Code
    try {
      const fallback = await api.get(`/articles/${slugOrId}`);
      return mapArticle(fallback.data);
    } catch {
      return null;
    }
  }
};

export const getArticlesByCategory = async (category, page = 1, limit = 12) => {
  try {
    const response = await api.get(`/articles/category/${encodeURIComponent(category)}`, { params: { page, limit } });
    return {
      articles: (response.data.articles || []).map(mapArticle),
      pagination: { currentPage: response.data.currentPage || 1, totalPages: response.data.totalPages || 0, totalCount: response.data.totalArticles || 0 }
    };
  } catch {
    return { articles: [], pagination: { totalPages: 0 } };
  }
};

export const searchArticles = async (query, page = 1, limit = 12) => {
  try {
    const response = await api.get('/articles', { params: { search: query, page, limit } });
    return {
      articles: (response.data.articles || []).map(mapArticle),
      pagination: { currentPage: response.data.currentPage || 1, totalPages: response.data.totalPages || 0, totalCount: response.data.totalArticles || 0 }
    };
  } catch {
    return { articles: [], pagination: { totalPages: 0 } };
  }
};

export const getVideosByChannel = async (channelName) => {
  try {
    const response = await api.get('/videos');
    const filtered = response.data.filter(v => v.channel?.name?.toLowerCase().trim() === channelName.toLowerCase().trim());
    const mapVideo = (item) => {
      const yid = extractYoutubeId(item.url);
      return { id: item._id, title: item.name, youtubeId: yid, thumbnail: yid ? `https://img.youtube.com/vi/${yid}/maxresdefault.jpg` : 'https://via.placeholder.com/480x270', channelName: item.channel?.name || "Général" };
    };
    return filtered.map(mapVideo);
  } catch {
    return [];
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch {
    return [];
  }
};