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
          <span className="text-postman-orange">.</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover how AI enhances content quality by learning from top-ranking articles
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Articles</p>
              <p className="text-3xl font-bold text-gray-900">{articles.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FaBookOpen className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">AI-Optimized</p>
              <p className="text-3xl font-bold text-gray-900">
                {articles.filter(a => a.is_updated).length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <FaSyncAlt className="text-green-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total References</p>
              <p className="text-3xl font-bold text-gray-900">
                {articles.reduce((acc, article) => acc + (article.references?.length || 0), 0)}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <FaFire className="text-postman-orange text-xl" />
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-postman-orange focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-postman-orange text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Articles
            </button>
            <button
              onClick={() => setFilter('updated')}
              className={`px-4 py-3 rounded-lg font-medium transition-colors flex items-center ${
                filter === 'updated'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaSyncAlt className="mr-2" />
              Optimized
            </button>
            <button
              onClick={() => setFilter('original')}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                filter === 'original'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Original
            </button>
          </div>
        </div>
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