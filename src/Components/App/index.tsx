import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from './../Card';
import axios from 'axios';
import './App.css';
import { Recipe } from '../../common/types';

const api = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=9'
const config = {
  headers: {
    'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY || '',
  }
}

function App() {
  const [randomRecipes, setRandomRecipes] = useState([]);

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      const { data } = await axios.get(api, config);

      setRandomRecipes(data.recipes);
    }

    fetchRandomRecipes();
  }, [])
  return (
    <Box sx={{ my: 4, backgroundColor: 'secondary.main' }}>
      <Container maxWidth="lg">
          <Typography variant="h4" component="h1" gutterBottom>
            Fud.
          </Typography>
          <Grid container justifyContent="flex-start" rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
            {randomRecipes.map((randomRecipe:Recipe) =>
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
      </Container>
    </Box>
  );
}

export default App;
