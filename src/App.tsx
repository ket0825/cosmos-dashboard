import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import AboutPage from './pages/AboutPage';

const App: React.FC = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Drawer variant="permanent" anchor="left">
          <List>
            <ListItem component={Link} to="/">
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem component={Link} to="/products">
              <ListItemText primary="Products" />
            </ListItem>
            <ListItem component={Link} to="/categories">
              <ListItemText primary="Categories" />
            </ListItem>
            <ListItem component={Link} to="/about">
              <ListItemText primary="About" />
            </ListItem>
          </List>
        </Drawer>
        <div style={{ flexGrow: 1, padding: '16px' }}>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/products" element={<ProductPage/>} />
            <Route path="/categories" element={<CategoryPage/>} />
            <Route path="/about" element={<AboutPage/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;