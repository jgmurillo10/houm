import React, { useEffect } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import Card, { CardSkeleton } from './../../Components/Card';
import { RecipeI } from '../../common/types';
import { fetchRecipes, selectTrending, selectTrendingStatus } from '../../store/recipes/trendingSlice';
import { setSubtitle } from '../../store/meta/metaSlice';
import { useAppSelector, useAppDispatch } from '../../store/hooks';

const Trending = () => {
  const recipes = useAppSelector(selectTrending);
  const status = useAppSelector(selectTrendingStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSubtitle('Explore'));
  }, [dispatch]);

  useEffect(() => {
    if (recipes.length === 0) {
      dispatch(fetchRecipes())
    }
  }, [dispatch, recipes.length]);

  return (
    <Box sx={{ py: 6 }}>
      <Typography variant='h3' component='h2' gutterBottom>
        Explore
      </Typography>
      <Typography variant='h4' component='p' sx={{ my: 4 }}>
        Thousands of recipes to explore at your hand.
      </Typography>
      <Grid
        container
        justifyContent='flex-start'
        rowSpacing={3}
        columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
        {recipes.map((recipe:RecipeI) =>
          <Grid key={recipe.id} item xs={12} sm={6} md={6} lg={4}>
            <Card
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
              summary={recipe.summary}
            />
          </Grid>
          )}
        {status === 'loading' && [0,1,2,3,4,5,6,7,8].map((i) => (
          <Grid key={i} item xs={12} sm={6} md={6} lg={4}>
           <CardSkeleton summary />
         </Grid>
        ))}
      </Grid>
      <Button
        disabled={status === 'loading'}
        sx={{ mt: 4, mx: 'auto', display: 'block' }}
        variant='contained'
        onClick={() => dispatch(fetchRecipes())}>
        {status === 'idle' ? 'Load more' : 'Loading'}
      </Button>
    </Box>
  );
};

export default Trending;
