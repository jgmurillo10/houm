import React, { useState, useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';
import Box from '@mui/material/Box';
import Card from './../../Components/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { RecipeI } from '../../common/types';

const api = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=6'
const config = {
  headers: {
    'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY || '',
  }
}

const Trending = () => {
  const [randomRecipes, setRandomRecipes] = useState([]);

  useEffect(() => {
    let cancelToken: CancelTokenSource;
    const fetchRandomRecipes = async () => {
      if (typeof cancelToken != typeof undefined) {
        cancelToken.cancel("Operation canceled due to new request.")
      }

      cancelToken = axios.CancelToken.source();

      try {
        const { data } = await axios.get(api, {...config, cancelToken: cancelToken.token});

        setRandomRecipes(data.recipes);
      } catch (error) {
        console.log(error);
      }
    }

    fetchRandomRecipes();

    return () => {
      if (typeof cancelToken != typeof undefined) {
        cancelToken.cancel("Operation canceled due to new request.")
      }
    }
  }, [])

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
        {randomRecipes.map((randomRecipe:RecipeI) =>
          <Grid key={randomRecipe.id} item xs={12} sm={6} md={6} lg={4}>
            <Card
              id={randomRecipe.id}
              title={randomRecipe.title}
              image={randomRecipe.image}
              summary={randomRecipe.summary}
            />
          </Grid>
          )}
      </Grid>
    </Box>
  );
};

export default Trending;
