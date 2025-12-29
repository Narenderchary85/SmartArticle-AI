import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { articleService } from '../services/api';
import ArticleDetail from '../components/ArticleDetails';

const ArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const data = await articleService.getArticleById(id);
      setArticle(data);
    } catch (err) {
      setError('Failed to load article');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-postman-orange border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h2>
        <p className="text-gray-600 mb-6">{error || 'The article you are looking for does not exist.'}</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-postman-orange text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Back to Articles
        </button>
      </div>
    );
  }

  return (
    <ArticleDetail article={article} />
  );
};

export default ArticlePage;