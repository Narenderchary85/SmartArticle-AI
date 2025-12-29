import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaRegCopy,
  FaCheck,
  FaExternalLinkAlt,
  FaMagic,
  FaFileAlt
} from 'react-icons/fa';
import { format } from 'date-fns';

const ArticleDetail = ({ article }) => {
  const [activeTab, setActiveTab] = useState('comparison');
  const [copied, setCopied] = useState(false);

  const parseContent = (content) => {
    if (!content) return [];
    return content.split('\n').filter(Boolean).map((line, i) => ({
      id: i,
      type: line.startsWith('#') ? 'heading' : 'paragraph',
      content: line.replace(/^#+/, '').trim()
    }));
  };

  const originalContent = parseContent(article.content);
  const updatedContent = parseContent(article.updated_content);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const ContentBlock = ({ title, subtitle, content, accent }) => (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          {subtitle && (
            <p className="text-sm text-slate-500">{subtitle}</p>
          )}
        </div>


      </div>

      <div className="space-y-4">
        {content.map(item => (
          <div key={item.id}>
            {item.type === 'heading' ? (
              <h4 className="text-base font-semibold text-slate-900">
                {item.content}
              </h4>
            ) : (
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.content}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const ComparisonView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <ContentBlock
        title="Original Article"
        subtitle="Scraped from BeyondChats"
        content={originalContent}
        accent="indigo"
      />
      <ContentBlock
        title="AI-Optimized Version"
        subtitle="Enhanced using top-ranking references"
        content={updatedContent}
        accent="emerald"
      />
    </div>
  );

  const DiffView = () => (
    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
      {originalContent.map((item, i) => (
        <div
          key={i}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4 border-b last:border-none"
        >
          <div className="text-sm text-slate-600">
            {item.content}
          </div>
          <div className="text-sm text-emerald-700">
            {updatedContent[i]?.content}
          </div>
        </div>
      ))}
    </div>
  );

  const ReferencesView = () => (
    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
      {article.references?.map((ref, i) => (
        <a
          key={i}
          href={ref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition"
        >
          <span className="text-sm text-slate-700 truncate">
            {ref}
          </span>
          <FaExternalLinkAlt className="text-slate-400" />
        </a>
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 space-y-10"
    >
      <div className="bg-white border border-slate-200 rounded-2xl p-8">
        <h1 className="text-3xl font-semibold text-slate-900 mb-2">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-2">
            <FaFileAlt />
            {article.is_updated ? 'AI-Optimized Article' : 'Original Article'}
          </span>
          <span>
            Updated on {format(new Date(article.updated_at || article.scraped_at), 'MMM dd, yyyy')}
          </span>
        </div>

        <div className="mt-6">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            View source article
            <FaExternalLinkAlt />
          </a>
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-200">
        {['comparison', 'diffs', 'references'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition
              ${activeTab === tab
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            {tab === 'comparison' && 'Side by Side'}
            {tab === 'diffs' && 'Changes'}
            {tab === 'references' && 'References'}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === 'comparison' && <ComparisonView />}
          {activeTab === 'diffs' && <DiffView />}
          {activeTab === 'references' && <ReferencesView />}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default ArticleDetail;
