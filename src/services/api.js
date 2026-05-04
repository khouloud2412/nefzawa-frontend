import axios from 'axios';

// 1. Configuration de base dynamique
const BASE_URL = import.meta.env.VITE_API_URL || 'http://158.220.111.130:3000/api';
const SERVER_URL = BASE_URL.replace('/api', '');

const api = axios.create({ baseURL: BASE_URL });

/**
 * 🛠 HELPERS (Formatage images et IDs YouTube)
 */
const formatImageUrl = (url) => {
  if (!url) return 'https://via.placeholder.com/800x450?text=Nefzawa+Media';
  if (url.startsWith('http')) return url;
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return `${SERVER_URL}${cleanPath}`;
};

const extractYoutubeId = (url) => {
  if (!url || typeof url !== 'string') return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

/**
 * 🛠 MAPPING (Adaptateur de données)
 */
const mapArticle = (item) => {
  const isBadSlug = !item.slug || item.slug.length < 3 || /^-?\d+$/.test(item.slug);
  const finalSlug = isBadSlug ? item._id : item.slug;

  return {
    id: item._id,
    title: item.title,
    slug: finalSlug,
    image: formatImageUrl(item.imageUrl),
    category: item.category || "عام",
    date: item.createdAt ? new Date(item.createdAt).toLocaleDateString('fr-FR') : "00/00/0000",
    createdAt: item.createdAt,
    content: item.content,
    excerpt: item.summary || "",
    isFeatured: item.is_star || false,
    author: item.author || "فريق نفزاوة"
  };
};

const mapVideo = (item) => {
  const yid = extractYoutubeId(item.url);
  return {
    id: item._id,
    title: item.name,
    youtubeId: yid,
    thumbnail: yid ? `https://img.youtube.com/vi/${yid}/maxresdefault.jpg` : 'https://via.placeholder.com/480x270',
    channelName: item.channel?.name || "Général"
  };
};

/**
 * 🚀 SERVICES EXPORTÉS (Indispensables pour tes pages)
 */

// 📰 Récupérer les articles par catégorie
export const getArticlesByCategory = async (category, page = 1, limit = 12) => {
  try {
    const response = await api.get(`/articles/category/${encodeURIComponent(category)}`, {
      params: { page, limit }
    });
    return {
      articles: (response.data.articles || []).map(mapArticle),
      pagination: {
        currentPage: response.data.currentPage || 1,
        totalPages: response.data.totalPages || 0,
        totalCount: response.data.totalArticles || 0
      }
    };
  } catch (err) {
    console.error("Erreur API Articles:", err.message);
    return { articles: [], pagination: { totalPages: 0 } };
  }
};

// 📖 Récupérer un détail d'article par Slug (ou ID en secours)
export const getArticleBySlug = async (slugOrId) => {
  try {
    const response = await api.get(`/articles/slug/${encodeURIComponent(slugOrId)}`);
    return mapArticle(response.data);
  } catch (err) {
    if (err.response?.status === 404) {
      try {
        const fallback = await api.get(`/articles/${slugOrId}`);
        return mapArticle(fallback.data);
      } catch { return null; }
    }
    return null;
  }
};

// 📺 Récupérer les vidéos d'une chaîne
export const getVideosByChannel = async (channelName) => {
  try {
    const response = await api.get('/videos');
    const filtered = response.data.filter(v => 
       v.channel?.name?.toLowerCase().trim() === channelName.toLowerCase().trim()
    );
    return filtered.map(mapVideo);
  } catch (err) {
    console.error("Erreur API Vidéos:", err.message);
    return [];
  }
};

// 📁 Récupérer toutes les catégories
export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (err) {
    console.error("Erreur API Catégories:", err.message);
    return [];
  }
};