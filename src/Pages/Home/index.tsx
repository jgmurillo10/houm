import React, { useEffect, useMemo, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import debounce from 'lodash.debounce';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Hero from './../../Components/Hero';
import Card, { CardLoading } from './../../Components/Card';
import { ComboBox, CheckboxesTags} from './../../Components/Autocomplete';
import { RecipeI } from '../../common/types';
import {
  fetchFilteredRecipes,
  setSearchParams,
  selectFilteredRecipes,
  selectQueryStatus,
  selectQueryParams
} from '../../features/recipes/querySlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import './Home.css';
//TODO(jgmurillo10): Refactor cards container.

const PanelSearch = () => {
  const recipes = useAppSelector(selectFilteredRecipes);
  const status = useAppSelector(selectQueryStatus);
  const searchParams = useAppSelector(selectQueryParams);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (recipes.length === 0) {
      dispatch(fetchFilteredRecipes(searchParams))
    }
  }, [dispatch, recipes.length, searchParams])

  const handleQuery = useCallback(async (params) => {
    dispatch(fetchFilteredRecipes(params));
  }, [dispatch]);

  const debouncedChangeHandler = useMemo(
    () => debounce(handleQuery, 300)
  , [handleQuery]);

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    }
  }, [debouncedChangeHandler]);

  const handleDiet = (e: React.SyntheticEvent<Element, Event>, value: {label: string, value: string} | null) => {
    dispatch(setSearchParams({
      ...searchParams,
      diet: value?.value || '',
    }));
  }
  const handleCuisine = (e: React.SyntheticEvent<Element, Event>, value: string[]) => {
    dispatch(setSearchParams({
      ...searchParams,
      cuisine: value.join(','),
    }));
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
        onChange={(e) => dispatch(setSearchParams({ ...searchParams, query: e.target.value }))} />
      <ComboBox
        value={{
          label: searchParams.diet,
          value: searchParams.diet,
        }}
        onChange={handleDiet} />
      <CheckboxesTags
        value={searchParams.cuisine ? searchParams.cuisine.split(',') : []}
        onChange={handleCuisine} />
      <Grid
        container
        justifyContent="flex-start"
        rowSpacing={3}
        columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
        {status === 'loading' && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(_ =>
          <Grid key={_} item xs={12} sm={6} md={6} lg={4}>
            <CardLoading />
          </Grid>
        )}
        {status === 'idle' && recipes.length === 0 &&
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <Typography variant="h4" component="h2">No recipes found :(</Typography>
          </Grid>
        }
        {recipes.map((randomRecipe:RecipeI) =>
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
