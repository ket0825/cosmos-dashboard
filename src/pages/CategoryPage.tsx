/**
 * CategoryPage.tsx
 * Stat of the each Category.
 * Query: get category by ...
 */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Card, CardContent, CardActionArea, Typography } from '@mui/material';

const CategoryPage: React.FC = () => {
  const theme = useTheme();
  const appBarHeight = theme.mixins.toolbar.minHeight;

  const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4'];

  const handleCategoryClick = (category: string) => {
    // 카테고리 클릭 시 처리할 로직 작성
    console.log(`Clicked on ${category}`);
  };

  // Fetch categories
  // useEffect(() => {
  //   // 카테고리 페이지 진입 시 처리할 로직 작성
  //   console.log('Category page loaded');
  // }, []);



  return (
    <>
      <div style={{ marginTop: appBarHeight }} />
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category}>
            <Card>
              <CardActionArea onClick={() => handleCategoryClick(category)}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category description goes here
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CategoryPage;