import axios from 'axios';
const api = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=6'
const config = {
  headers: {
    'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY || '',
  }
}

const fetchRecipes = async () => axios.get(api, config);

export default fetchRecipes;
