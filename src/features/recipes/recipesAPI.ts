import axios from 'axios';
import { Indexable, OptionI, SearchParamsI } from '../../common/types';
const baseAPI = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/';
const randomRecipesEndpoint = `${baseAPI}random?number=6`;
const searchRecipesEndpoint = `${baseAPI}search`;
/**
 * TODO(jgmurillo10): There's an issue in the API with the pagination. On the
 * last pages, when the offset is near the limit, the totalResults is not
 * consistent with the query, causing an error on the nunmber of pages.
 * Sometimes even returns no results at all.
 */
const config = {
  headers: {
    'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY || '',
  },
};

const Cleaners : Indexable = {
  'type': (val: OptionI | null) => val ? val.value : '',
  'diet': (val: OptionI | null) => val ? val.value : '',
  'cuisine': (val: string[]) => val.join(','),
};

const cleanParams = (params : SearchParamsI) => {
  Object.entries(params).forEach(([key, value]) => {
    const cleanerFunction = Cleaners[key];

    if (cleanerFunction) {
      params = {
        ...params,
        [key]: cleanerFunction(value),
      };
    }
  });

  return params;
};

const getRecipes = async () => axios.get(randomRecipesEndpoint, config);

const getFilteredRecipes =
  async (rawParams : SearchParamsI) => {
    const params = cleanParams(rawParams);

    return axios.get(searchRecipesEndpoint, {...config, params })
  };

const getRecipeInformation = async (recipeId : string) => axios.get(
  `${baseAPI}${recipeId}/information`, {...config}
);

const getRelatedRecipes = async (recipeId : string) => axios.get(
  `${baseAPI}${recipeId}/similar`, {...config}
);

export { getRecipes, getFilteredRecipes, getRecipeInformation, getRelatedRecipes };
