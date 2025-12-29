import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt, FaRegClock, FaSyncAlt } from 'react-icons/fa';
import { format } from 'date-fns';

const ArticleCard = ({ article }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <motion.span 
            animate={{ 
              scale: article.is_updated ? [1, 1.1, 1] : 1 
            }}
            transition={{ 
              repeat: article.is_updated ? Infinity : 0, 
              duration: 2 
            }}
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${article.is_updated ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}
          >
            {article.is_updated ? (
              <>
                <FaSyncAlt className="mr-2" />
                AI-Optimized
              </>
            ) : 'Original'}
          </motion.span>
          
          <span className="text-sm text-gray-500 flex items-center">
            <FaRegClock className="mr-1" />
            {format(new Date(article.scraped_at), 'MMM d, yyyy')}
          </span>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {article.title}
        </h2>

        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Original Content:</h3>
          <p className="text-gray-600 line-clamp-3 text-sm mb-3">
            {article.content?.substring(0, 150)}...
          </p>
          
          {article.is_updated && (
            <>
              <h3 className="text-sm font-semibold text-green-700 mb-2">Optimized Content:</h3>
              <p className="text-green-800 line-clamp-3 text-sm">
                {article.updated_content?.substring(0, 150)}...
              </p>
            </>
          )}
        </div>

        {article.references?.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-700 mb-1">
              <span className="font-semibold">References:</span> {article.references.length} sources
            </p>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              to={`/article/${article._id}`}
              className=" px-4 py-2 rounded-lg font-medium hover:bg-orange-600 hover:text-white transition-colors"
            >
              View Details
            </Link>
          </motion.div>
          
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 hover:text-postman-orange transition-colors"
          >
            <FaExternalLinkAlt className="mr-2" />
            Original Article
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleCard;