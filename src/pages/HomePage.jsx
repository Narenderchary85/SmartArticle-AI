import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ArticleCard from '../components/ArticleCard';
import { articleService } from '../services/api';

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
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filter === 'updated') {
      filtered = filtered.filter(article => article.is_updated);
    } else if (filter === 'original') {
      filtered = filtered.filter(article => !article.is_updated);
    }

    setFilteredArticles(filtered);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-12">

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center pt-16"
      >
        <h1 className="text-4xl md:text-5xl font-semibold text-slate-900">
          SmartArticle-AI
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          Original articles intelligently enhanced using insights from
          top-ranking content across the web.
        </p>
      </motion.div>

      {filteredArticles.length === 0 ? (
        <div className="text-center py-20 bg-white border border-slate-200 rounded-xl">
          <p className="text-lg text-slate-600">No articles available</p>
          <p className="text-sm text-slate-500 mt-1">
            Try adjusting your filters or search keyword
          </p>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredArticles.map(article => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default HomePage;
