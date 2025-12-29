import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import './index.css';
import ArticlePage from './pages/ArticlePage';
import HomePage from './pages/Homepage';

function App() {
  return (
    <div>     
       <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
        </Routes>
      </Layout>
      </div>

  );
}

export default App;