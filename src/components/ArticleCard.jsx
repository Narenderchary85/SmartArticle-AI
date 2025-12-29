import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const ArticleCard = ({ article }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium
          ${article.is_updated
            ? 'bg-emerald-100 text-emerald-700'
            : 'bg-indigo-100 text-indigo-700'}`}
        >
          {article.is_updated ? 'AI Optimized' : 'Original'}
        </span>

        <span className="text-xs text-slate-500">
          {format(new Date(article.scraped_at), 'MMM dd, yyyy')}
        </span>
      </div>
      <h2 className="text-lg font-semibold text-slate-900 leading-snug mb-3 line-clamp-2">
        {article.title}
      </h2>

      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6">
        {article.is_updated
          ? article.updated_content?.substring(0, 160)
          : article.content?.substring(0, 160)}
        ...
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <Link
          to={`/article/${article._id}`}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition"
        >
          Read Article →
        </Link>

        {article.references?.length > 0 && (
          <span className="text-xs text-slate-500">
            {article.references.length} references
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default ArticleCard;
