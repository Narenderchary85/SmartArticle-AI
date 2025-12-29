import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaRegCopy, 
  FaCheck, 
  FaExternalLinkAlt, 
  FaBookOpen,
  FaEdit,
  FaArrowLeft,
  FaRegFileAlt,
  FaMagic
} from 'react-icons/fa';
import { format } from 'date-fns';

const ArticleDetail = ({ article }) => {
  const [activeTab, setActiveTab] = useState('comparison');
  const [copied, setCopied] = useState(false);

const parseContent = (content) => {
    if (!content) return [];
    
    const lines = content.split('\n');
    const structuredContent = [];
    let currentParagraph = '';
    
    lines.forEach((line) => {
      const trimmedLine = line.trim();
      
      if (!trimmedLine) {
        if (currentParagraph) {
          structuredContent.push({ 
            type: 'p', 
            content: currentParagraph.trim(),
            id: `p-${structuredContent.length}`
          });
          currentParagraph = '';
        }
        return;
      }
      
      if (trimmedLine.startsWith('# ')) {
        if (currentParagraph) {
          structuredContent.push({ 
            type: 'p', 
            content: currentParagraph.trim(),
            id: `p-${structuredContent.length}`
          });
          currentParagraph = '';
        }
        structuredContent.push({ 
          type: 'h1', 
          content: trimmedLine.substring(2).trim(),
          id: `h1-${structuredContent.length}`
        });
      } else if (trimmedLine.startsWith('## ')) {
        if (currentParagraph) {
          structuredContent.push({ 
            type: 'p', 
            content: currentParagraph.trim(),
            id: `p-${structuredContent.length}`
          });
          currentParagraph = '';
        }
        structuredContent.push({ 
          type: 'h2', 
          content: trimmedLine.substring(3).trim(),
          id: `h2-${structuredContent.length}`
        });
      } else if (trimmedLine.startsWith('### ')) {
        if (currentParagraph) {
          structuredContent.push({ 
            type: 'p', 
            content: currentParagraph.trim(),
            id: `p-${structuredContent.length}`
          });
          currentParagraph = '';
        }
        structuredContent.push({ 
          type: 'h3', 
          content: trimmedLine.substring(4).trim(),
          id: `h3-${structuredContent.length}`
        });
      } else if (trimmedLine.startsWith('#### ')) {
        if (currentParagraph) {
          structuredContent.push({ 
            type: 'p', 
            content: currentParagraph.trim(),
            id: `p-${structuredContent.length}`
          });
          currentParagraph = '';
        }
        structuredContent.push({ 
          type: 'h4', 
          content: trimmedLine.substring(5).trim(),
          id: `h4-${structuredContent.length}`
        });
      } else {
        currentParagraph += trimmedLine + ' ';
      }
    });
    
    if (currentParagraph) {
      structuredContent.push({ 
        type: 'p', 
        content: currentParagraph.trim(),
        id: `p-${structuredContent.length}`
      });
    }
    
    return structuredContent;
  };

  const originalContent = parseContent(article.content);
  const updatedContent = parseContent(article.updated_content);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContentSection = (content, type) => {
    if (type === 'original') {
      return (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaBookOpen className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Original Content</h3>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => copyToClipboard(article.content)}
              className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {copied ? <FaCheck className="text-green-600" /> : <FaRegCopy />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </motion.button>
          </div>
          
          <div className="prose prose-lg max-w-none border-l-4 border-blue-200 pl-4">
            {content.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {item.type === 'h1' && <h1 className="text-3xl font-bold text-gray-900 mb-4">{item.content}</h1>}
                {item.type === 'h2' && <h2 className="text-2xl font-bold text-gray-800 mb-3">{item.content}</h2>}
                {item.type === 'h3' && <h3 className="text-xl font-semibold text-gray-700 mb-2">{item.content}</h3>}
                {item.type === 'h4' && <h4 className="text-lg font-semibold text-gray-600 mb-2">{item.content}</h4>}
                {item.type === 'p' && <p className="text-gray-700 mb-4 leading-relaxed">{item.content}</p>}
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    } else {
      return (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
                <FaMagic className="text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">AI-Optimized Content</h3>
                <p className="text-sm text-gray-600">Enhanced based on top-ranking articles</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => copyToClipboard(article.updated_content)}
                className="flex items-center space-x-2 px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                {copied ? <FaCheck /> : <FaRegCopy />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </motion.button>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none border-l-4 border-green-200 pl-4">
            {content.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className={`${item.type.startsWith('h') ? 'text-green-900' : 'text-gray-800'}`}
              >
                {item.type === 'h1' && <h1 className="text-3xl font-bold mb-4">{item.content}</h1>}
                {item.type === 'h2' && <h2 className="text-2xl font-bold mb-3">{item.content}</h2>}
                {item.type === 'h3' && <h3 className="text-xl font-semibold mb-2">{item.content}</h3>}
                {item.type === 'h4' && <h4 className="text-lg font-semibold mb-2">{item.content}</h4>}
                {item.type === 'p' && <p className="mb-4 leading-relaxed">{item.content}</p>}
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    }
  };

  const renderComparisonView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        {renderContentSection(originalContent, 'original')}
      </div>
      <div className="bg-gradient-to-br from-white to-green-50 rounded-xl p-6 shadow-lg border border-green-200">
        {renderContentSection(updatedContent, 'updated')}
      </div>
    </div>
  );

  const renderDiffsView = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <div className="space-y-6">
        {originalContent.map((origItem, index) => {
          const updatedItem = updatedContent[index];
          if (!updatedItem) return null;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border-b border-gray-100 pb-6 last:border-0"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Original</span>
                  </div>
                  <div className="text-gray-600 bg-blue-50 p-3 rounded-lg">
                    {origItem.content}
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Optimized</span>
                  </div>
                  <div className="text-gray-800 bg-green-50 p-3 rounded-lg">
                    {updatedItem.content}
                  </div>
                </div>
              </div>

              {origItem.content !== updatedItem.content && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r"
                >
                  <p className="text-sm text-yellow-800">
                    <span className="font-semibold">Improvement:</span> Content has been optimized for better SEO and readability
                  </p>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderReferences = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <FaExternalLinkAlt className="mr-3 text-postman-orange" />
        Reference Sources
      </h3>
      <div className="space-y-4">
        {article.references?.map((ref, index) => (
          <motion.a
            key={index}
            href={ref}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 10 }}
            className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
          >
            <div className="flex-shrink-0 w-8 h-8 bg-postman-orange text-white rounded-full flex items-center justify-center font-bold mr-4">
              {index + 1}
            </div>
            <div className="flex-grow">
              <p className="text-gray-700 group-hover:text-postman-orange transition-colors truncate">
                {ref}
              </p>
            </div>
            <FaExternalLinkAlt className="text-gray-400 group-hover:text-postman-orange transition-colors" />
          </motion.a>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="bg-gradient-to-r from-white to-orange-50 rounded-2xl p-8 shadow-lg border border-orange-100">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              {article.title}
            </h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <span className="flex items-center">
                <FaRegFileAlt className="mr-2" />
                {article.is_updated ? 'AI-Optimized Article' : 'Original Article'}
              </span>
              <span>•</span>
              <span>Last updated: {format(new Date(article.updated_at || article.scraped_at), 'PPP')}</span>
            </div>
          </div>
          
          <motion.a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center px-4 py-3 bg-postman-orange text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <FaExternalLinkAlt className="mr-2" />
            View Original Article
          </motion.a>
        </div>

        <div className="flex space-x-2 border-b border-gray-200">
          {['comparison', 'diffs', 'references'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
                activeTab === tab
                  ? 'bg-white text-postman-orange border-t border-l border-r border-gray-200'
                  : 'text-gray-600 hover:text-postman-orange hover:bg-white/50'
              }`}
            >
              {tab === 'comparison' && 'Side-by-Side'}
              {tab === 'diffs' && 'Content Analysis'}
              {tab === 'references' && 'References'}
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'comparison' && renderComparisonView()}
          {activeTab === 'diffs' && renderDiffsView()}
          {activeTab === 'references' && renderReferences()}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default ArticleDetail;