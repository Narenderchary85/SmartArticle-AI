import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ArticleCard from '../components/ArticleCard';
import { articleService } from '../services/api';
import { FaSearch, FaFilter, FaSyncAlt, FaFire, FaBookOpen } from 'react-icons/fa';

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); 

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [articles, searchTerm, filter]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const data = await articleService.getAllArticles();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterArticles = () => {
    let filtered = articles;
    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filter === 'updated') {
      filtered = filtered.filter(article => article.is_updated);
    } else if (filter === 'original') {
      filtered = filtered.filter(article => !article.is_updated);
    }

    setFilteredArticles(filtered);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
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

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          AI-Optimized Articles
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover how AI enhances content quality by learning from top-ranking articles
        </p>
      </motion.div>
    

      {filteredArticles.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-white rounded-xl shadow-lg border border-gray-200"
        >
          <p className="text-xl text-gray-600">No articles found</p>
          <p className="text-gray-500 mt-2">Try a different search term or filter</p>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredArticles.map((article, index) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default HomePage;