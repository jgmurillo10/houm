import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { RecipeI, SearchParamsI } from '../../common/types';
import { getFilteredRecipes } from './recipesAPI';

export interface PaginationI {
  page: number;
  totalResults?: number;
};

export interface QueryState {
  recipes: Array<RecipeI>;
  status: 'idle' | 'loading' | 'failed';
  pagination: PaginationI
  searchParams: SearchParamsI;
};

const initialState: QueryState = {
  recipes: [],
  status: 'idle',
  searchParams: {
    query: '',
    diet: '',
    cuisine: '',
    number: 9,
  },
  pagination: {
    page: 0,
  },
};

export const fetchFilteredRecipes = createAsyncThunk(
  'query/searchRecipes',
  async (params: SearchParamsI) => {
    const response = await getFilteredRecipes(params);

    return response.data;
  }
);

export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setSearchParams: (state, action: PayloadAction<SearchParamsI>) => {
      state.searchParams = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFilteredRecipes.fulfilled, (state, action) => {
        state.status = 'idle';
        state.recipes = action.payload.results;
        state.pagination = {
          ...state.pagination,
          totalResults: action.payload.totalResults
        };
      })
      .addCase(fetchFilteredRecipes.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setSearchParams } = querySlice.actions;
export const selectFilteredRecipes = (state: RootState) => state.query.recipes;
export const selectQueryStatus = (state: RootState) => state.query.status;
export const selectQueryParams = (state: RootState) => state.query.searchParams;
export default querySlice.reducer;
