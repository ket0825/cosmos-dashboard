/**
 * CategoryPage.tsx
 * Stat of the each Category.
 * Query: get category by ...
 */
import React, { useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Card, CardContent, CardActionArea, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrl, stage } from '../settings';
import RouteHandler from '../api/RouteHandler';
import {categoryNameMapper} from '../utils/categoryNameMapper';

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const rerenderingCount = useRef(0);
  console.log(error);

  const theme = useTheme();
  const appBarHeight = theme.mixins.toolbar.minHeight;
  const navigate = useNavigate();

  const handleCategoryClick = (s_category: string, idx: number) => {
    // 카테고리 클릭 시 처리할 로직 작성
    console.log(`Clicked on ${s_category}`);
    navigate(`/categories/${s_category}`, {state: categories[idx]}) 
  };
  
  // Fetch categories
  useEffect(() => {
    // 카테고리 페이지 진입 시 처리할 로직 작성
    const fetchCategories = async () => {
      try {
        console.log(loading)
        const routeHandler = new RouteHandler(stage, apiUrl);
        const res = await routeHandler.getCategory();
        setCategories(res);
        setLoading(false);
      } catch(error) {
        setLoading(false);
        if (error instanceof Error) {
          setError(error.message);          
        } else {
          throw error;
        }
      }
    }
    fetchCategories();
  }, []);

  // responsive design
  // <Grid item xs={12} sm={4} md={4} key={category}> 
  
  
  console.log("리렌더링 횟수:",rerenderingCount.current)
  rerenderingCount.current += 1;

  return (
    <>
      <div style={{ marginTop: appBarHeight }} />
      <Typography gutterBottom variant="h4" component="div">
            카테고리 목록
        </Typography>
      <Grid container spacing={4} direction="row">        
        {categories.map((category, idx) => (
          <Grid item xs={7} sm={7} md={7} lg={7} xl={7} key={category.id} > 
            <Card>
              <CardActionArea onClick={() => handleCategoryClick(category.caid, idx)}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" textAlign='center'>
                    {categoryNameMapper[category.s_category]}
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