import React, { useEffect, useState, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import debounce from 'lodash.debounce';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Hero from './../../Components/Hero';
import Card from './../../Components/Card';
import axios, { CancelTokenSource } from 'axios';
import './Home.css';
import { RecipeI } from '../../common/types';
//TODO(jgmurillo10): Refactor cards container.
const config = {
  headers: {
    'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY || '',
  }
}

function Home() {
  const [resultRecipes, setResultRecipes] = useState([]);

  let cancelToken: CancelTokenSource;
  const handleQuery = async (e : React.ChangeEvent<HTMLInputElement>) => {
      if (typeof cancelToken != typeof undefined) {
        cancelToken.cancel("Operation canceled due to new request.")
      }

      cancelToken = axios.CancelToken.source();
    const params = {
      query: e.target.value,
    };

    try {
      const { data } = await axios.get(
        `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search`,
        {...config, params, cancelToken: cancelToken.token });
      console.log('results for', e.target.value)

      setResultRecipes(data.results);
    } catch (e) {
      console.log(e)
    }
  }

  const debouncedChangeHandler = useMemo(
    () => debounce(handleQuery, 300)
  , []);

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    }
  }, [debouncedChangeHandler]);

  return (
    <>
      <Hero
        title="Let's cook something together"
        primary={{ text: 'Search recipes', url: '#search'}}
        secondary={{ text: 'Explore trending', url: '/trending'}}
      ></Hero>
      <Box id="search">
        <Typography variant="h3" component="h2" gutterBottom>
          Search for recipes
        </Typography>
        <TextField
          sx={{ my: 2 }}
          fullWidth
          id="outlined-basic"
          label="Search recipes"
          variant="outlined"
          onChange={debouncedChangeHandler} />
        <Grid
          container
          justifyContent="flex-start"
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
          {resultRecipes.map((randomRecipe:RecipeI) =>
            <Grid key={randomRecipe.id} item xs={12} sm={6} md={6} lg={4}>
              <Card
                id={randomRecipe.id}
                title={randomRecipe.title}
                image={`https://spoonacular.com/recipeImages/${randomRecipe.image}`}
                summary={randomRecipe.summary}
              />
            </Grid>
            )}
        </Grid>
      </Box>
    </>
  );
}

export default Home;
