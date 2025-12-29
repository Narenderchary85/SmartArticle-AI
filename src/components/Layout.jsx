import React from 'react';
import { motion } from 'framer-motion';
import { FaBlog, FaArrowLeft } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="bg-postman-orange text-white p-2 rounded-lg"
              >
                <FaBlog size={24} />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  BeyondChats
                  <span className="text-postman-orange">.</span>
                </h1>
                <p className="text-sm text-gray-600">AI-Optimized Articles</p>
              </div>
            </div>
            
            {!isHomePage && (
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/"
                  className="flex items-center space-x-2 text-gray-700 hover:text-postman-orange transition-colors"
                >
                  <FaArrowLeft />
                  <span>Back to Articles</span>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </motion.header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>Articles powered by AI optimization • Data scraped from BeyondChats</p>
          <p className="text-sm mt-2">© {new Date().getFullYear()} Article Optimizer</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;