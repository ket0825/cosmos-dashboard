import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import AboutPage from './pages/AboutPage';
import Sidebar from './components/Sidebar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

const App: React.FC = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;