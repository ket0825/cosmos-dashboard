import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Typography, Toolbar, AppBar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const HomePage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    handleDrawerClose();
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={handleDrawerOpen} edge="start">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
        <List>
          <ListItem button onClick={() => handleItemClick('Item 1')}>
            <ListItemText primary="Item 1" />
          </ListItem>
          <ListItem button onClick={() => handleItemClick('Item 2')}>
            <ListItemText primary="Item 2" />
          </ListItem>
          <ListItem button onClick={() => handleItemClick('Item 3')}>
            <ListItemText primary="Item 3" />
          </ListItem>
        </List>
      </Drawer>
      <div style={{ padding: '16px' }}>
        {selectedItem === 'Item 1' && (
          <div>
            <h2>Item 1</h2>
            <p>Content for Item 1</p>
          </div>
        )}
        {selectedItem === 'Item 2' && (
          <div>
            <h2>Item 2</h2>
            <p>Content for Item 2</p>
          </div>
        )}
        {selectedItem === 'Item 3' && (
          <div>
            <h2>Item 3</h2>
            <p>Content for Item 3</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;