import axios from 'axios';
import { SearchParamsI } from '../../common/types';
const baseAPI = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/';
const randomRecipesEndpoint = `${baseAPI}random?number=6`;
const searchRecipesEndpoint = `${baseAPI}search`;

const config = {
  headers: {
    'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY || '',
  },
};

const getRecipes = async () => axios.get(randomRecipesEndpoint, config);
const getFilteredRecipes =
  async (params : SearchParamsI) => axios.get(searchRecipesEndpoint, {...config, params});

export { getRecipes, getFilteredRecipes };
