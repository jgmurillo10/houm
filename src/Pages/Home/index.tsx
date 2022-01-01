import React, { useEffect, useState, useMemo, useCallback, useRef, MutableRefObject } from 'react';
import Typography from '@mui/material/Typography';
import debounce from 'lodash.debounce';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Hero from './../../Components/Hero';
import Card, { CardLoading } from './../../Components/Card';
import { ComboBox, CheckboxesTags} from './../../Components/Autocomplete';
import axios, { CancelTokenSource } from 'axios';
import { RecipeI } from '../../common/types';
import './Home.css';
//TODO(jgmurillo10): Refactor cards container.
const config = {
  headers: {
    'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY || '',
  }
}

type SearchParamsI = {
  query: string;
  diet?: string;
  cuisine: string;
  number: number;
}

const PanelSearch = () => {
  const [resultRecipes, setResultRecipes] = useState([]);
  const [searchParams, setSearchParams] = useState<SearchParamsI>({
    query: '',
    diet: '',
    cuisine: '',
    number: 9,
  });

  let cancelToken: MutableRefObject<CancelTokenSource> =
    useRef(axios.CancelToken.source());

  const fetchRecipes = async (params: any, cancelToken:any) => {
    try {
      const { data } = await axios.get(
        `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search`,
        {...config, params, cancelToken: cancelToken.current.token });

      setResultRecipes(data.results);
    } catch (e) {
      console.log(e)
    }
  }
  const handleQuery = useCallback(async (params) => {
    if (typeof cancelToken != typeof undefined) {
      cancelToken.current.cancel("Operation canceled due to new request.")
    }

    cancelToken.current = axios.CancelToken.source();
    fetchRecipes(params, cancelToken);
  }, []);

  const debouncedChangeHandler = useMemo(
    () => debounce(handleQuery, 300)
  , [handleQuery]);

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    }
  }, [debouncedChangeHandler]);

  const handleDiet = (e: React.SyntheticEvent<Element, Event>, value: {label: string, value: string} | null) => {
    setSearchParams({
      ...searchParams,
      diet: value?.value,
    });
  }
  const handleCuisine = (e: React.SyntheticEvent<Element, Event>, value: string[]) => {
    setSearchParams({
      ...searchParams,
      cuisine: value.join(','),
    });
  }

  useEffect(() => {
    debouncedChangeHandler(searchParams);
  }, [searchParams, debouncedChangeHandler])

  return (
    <Box id="search" sx={{ py: 6 }}>
      <Typography variant="h3" component="h2" gutterBottom>
        Search for recipes
      </Typography>
      <TextField
        sx={{ my: 2 }}
        fullWidth
        id="outlined-basic"
        label="Search recipes"
        variant="outlined"
        value={searchParams.query}
        onChange={(e) => setSearchParams({ ...searchParams, query: e.target.value })} />
      <ComboBox onChange={handleDiet} />
      <CheckboxesTags onChange={handleCuisine} />
      <Grid
        container
        justifyContent="flex-start"
        rowSpacing={3}
        columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
        {resultRecipes.length === 0 && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(_ =>
          <Grid key={_} item xs={12} sm={6} md={6} lg={4}>
            <CardLoading />
          </Grid>
        )}
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
  );
};

function Home() {
 return (
    <>
      <Hero
        title="Let's cook something together"
        primary={{ text: 'Search recipes', url: '#search'}}
        secondary={{ text: 'Explore trending', url: '/trending'}}
      ></Hero>
      <PanelSearch />
    </>
  );
}

export default Home;
