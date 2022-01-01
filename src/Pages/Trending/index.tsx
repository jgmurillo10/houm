import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from './../../Components/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { RecipeI } from '../../common/types';
import { fetchRecipes, selectTrending, selectTrendingStatus } from './../../features/trending/trendingSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

const Trending = () => {
  const recipes = useAppSelector(selectTrending);
  const status = useAppSelector(selectTrendingStatus);
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (recipes.length === 0) {
      dispatch(fetchRecipes())
    }
  }, [dispatch, recipes.length])

  return (
    <Box sx={{ py: 6 }}>
      <Typography variant="h3" component="h2" gutterBottom>
        Trending
      </Typography>
      <Grid
        container
        justifyContent="flex-start"
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
      </Grid>
      <Button disabled={status === 'loading'} sx={{ mt: 4 }} variant="contained" onClick={() => dispatch(fetchRecipes())}>
        {status === 'idle' ? 'Load more' : 'Loading'}
      </Button>
    </Box>
  );
};

export default Trending;
