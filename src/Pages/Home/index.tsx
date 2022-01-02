import React, { useEffect, useMemo, useCallback, useRef } from 'react';
import Typography from '@mui/material/Typography';
import debounce from 'lodash.debounce';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import Hero from './../../Components/Hero';
import Card, { CardLoading } from './../../Components/Card';
import { ComboBox, CheckboxesTags} from './../../Components/Autocomplete';
import { RecipeI } from '../../common/types';
import {
  fetchFilteredRecipes,
  setSearchParams,
  setPage,
  selectFilteredRecipes,
  selectQueryStatus,
  selectQueryParams,
  selectPagination
} from '../../features/recipes/querySlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import './Home.css';
//TODO(jgmurillo10): Refactor cards container.

const PanelSearch = () => {
  const resultsRef = useRef<HTMLDivElement>(null);
  const recipes = useAppSelector(selectFilteredRecipes);
  const status = useAppSelector(selectQueryStatus);
  const searchParams = useAppSelector(selectQueryParams);
  const pagination = useAppSelector(selectPagination);
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    debouncedChangeHandler(searchParams);
  }, [searchParams, debouncedChangeHandler]);

  const handleAutocomplete = (e: React.SyntheticEvent<Element, Event>, value: {label: string, value: string} | string[] | null, queryParam : string) => {
    dispatch(setSearchParams({
      [queryParam]: value,
    }));
  }

  const handlePaginationChange = (event : React.ChangeEvent<any>, page : number) => {
    const offset = (page - 1) * searchParams.number;

    dispatch(setSearchParams({ offset }));
    dispatch(setPage(page));
    resultsRef.current?.scrollIntoView();
  }

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
        onChange={(e) => dispatch(setSearchParams({ query: e.target.value }))} />
      <ComboBox
        options={[
          { label: 'pescetarian', value: 'pescetarian' },
          { label: 'lacto vegetarian', value: 'lacto vegetarian' },
          { label: 'ovo vegetarian', value: 'ovo vegetarian' },
          { label: 'vegan', value: 'vegan' },
          { label: 'vegetarian', value: 'vegetarian' },
        ]}
        label="Diet"
        value={searchParams.diet}
        onChange={(event, value) => handleAutocomplete(event, value, 'diet')} />
      <ComboBox
        options={[
          { label: 'main course', value: 'main course' },
          { label: 'side dish', value: 'side dish' },
          { label: 'dessert', value: 'dessert' },
          { label: 'appetizer', value: 'appetizer' },
          { label: 'salad', value: 'salad' },
          { label: 'bread', value: 'bread' },
          { label: 'breakfast', value: 'breakfast' },
          { label: 'soup', value: 'soup' },
          { label: 'beverage', value: 'beverage' },
          { label: 'sauce', value: 'sauce' },
          { label: 'drink', value: 'drink' },
        ]}
        label="Type"
        value={searchParams.type}
        onChange={(event, value) => handleAutocomplete(event, value, 'type')} />
      <CheckboxesTags
        value={searchParams.cuisine}
        onChange={(event, value) => handleAutocomplete(event, value, 'cuisine')} />
      <Grid
        ref={resultsRef}
        container
        justifyContent="flex-start"
        rowSpacing={3}
        columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
        {status === 'loading' ? [1,2,3,4,5,6,7,8,9,10,11,12].map(_ =>
          <Grid key={_} item xs={12} sm={6} md={6} lg={4}>
            <CardLoading />
          </Grid>
        ) :
          recipes.map((randomRecipe:RecipeI) =>
            <Grid key={randomRecipe.id} item xs={12} sm={6} md={6} lg={4}>
              <Card
                id={randomRecipe.id}
                title={randomRecipe.title}
                image={`https://spoonacular.com/recipeImages/${randomRecipe.image}`}
                summary={randomRecipe.summary}
              />
            </Grid>
          )
        }
        {status === 'idle' && pagination.totalResults === 0 &&
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <Typography variant="h4" component="h2">No recipes found :(</Typography>
          </Grid>
        }
      </Grid>
      { recipes.length !== 0 &&
        <Pagination
          sx={{ mx: 'auto', my: 2, display: 'flex', justifyContent: 'center' }}
          onChange={handlePaginationChange}
          count={Math.min(50, Math.ceil(pagination.totalResults/searchParams.number))}
          page={pagination.page}
          siblingCount={1}
          boundaryCount={1}
        />
      }
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
