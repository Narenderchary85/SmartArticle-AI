import axios from 'axios';

const API_BASE_URL = 'http://localhost:1000/'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const articleService = {
  getAllArticles: async () => {
    try {
      const response = await api.get('/article/getarticles');
      return response.data;
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  },

  getArticleById: async (id) => {
    try {
      const response = await api.get(`article/getarticlesbyId/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching article:', error);
      throw error;
    }
  },

};