/**
 * CategoryPage.tsx
 * Stat of the each Category.
 * Query: get category by ...
 */
import React from 'react'
import { useTheme } from '@mui/material/styles';

const CategoryPage:React.FC = () => {
  const theme = useTheme();
  const appBarHeight = theme.mixins.toolbar.minHeight;

  return (
    <>
      <div style={{marginTop: appBarHeight}}/>
      <div>CategoryPage</div>
    </>
  )
}

export default CategoryPage