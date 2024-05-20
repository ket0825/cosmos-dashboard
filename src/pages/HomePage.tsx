import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const HomePage: React.FC = () => {
    const theme = useTheme();
    const appBarHeight = theme.mixins.toolbar.minHeight;

    return (
        <>
      <div style={{marginTop: appBarHeight}}/>
      <Typography variant='h3' noWrap component="div">
                Home Page (Guide and Introduction to COSMOS)
            </Typography>
        </>                
    );
};

export default HomePage;