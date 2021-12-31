import React, { useEffect, useState, useMemo } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import debounce from 'lodash.debounce';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Hero from './../Hero';
import Card from './../Card';
import axios from 'axios';
import './App.css';
import { RecipeI } from '../../common/types';
//TODO(jgmurillo10): Refactor cards container.
const api = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=6'
const config = {
  headers: {
    'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY || '',
  }
}

function App() {
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [resultRecipes, setResultRecipes] = useState([]);

  const handleQuery = async (e : React.ChangeEvent<HTMLInputElement>) => {
    const params = {
      query: e.target.value,
    };
    const { data } = await axios.get(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search`,
      {...config, params });

    setResultRecipes(data.results);
  }

  const debouncedChangeHandler = useMemo(
    () => debounce(handleQuery, 300)
  , []);

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    }
  }, [debouncedChangeHandler]);

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      const { data } = await axios.get(api, config);

      setRandomRecipes(data.recipes);
    }

    fetchRandomRecipes();
  }, [])
  return (
    <Box sx={{ py: 8, backgroundColor: 'secondary.main' }}>
      <Container maxWidth="lg">
        <Hero
          title="Let's cook something together"
          primary={{ text: 'Search recipes', url: '#search'}}
          secondary={{ text: 'Explore trending', url: '#trending'}}
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
        <Box id="trending" sx={{ py: 6 }}>
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
      </Container>
    </Box>
  );
}

export default App;
