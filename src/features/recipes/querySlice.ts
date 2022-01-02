import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { RecipeI, SearchParamsI } from '../../common/types';
import { getFilteredRecipes } from './recipesAPI';

export interface PaginationI {
  page: number;
  totalResults: number;
};

export interface QueryState {
  recipes: Array<RecipeI>;
  status: 'idle' | 'loading' | 'failed';
  pagination: PaginationI;
  searchParams: SearchParamsI;
};

const initialState: QueryState = {
  recipes: [],
  status: 'idle',
  searchParams: {
    query: '',
    diet: '',
    cuisine: '',
    number: 12,
    offset: 0,
  },
  pagination: {
    page: 1,
    totalResults: 12,
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
    setSearchParams: (state, action: PayloadAction<Object>) => {
      state.searchParams = {
        ...state.searchParams,
        ...action.payload,
        offset: 0,
      };
      state.pagination = {
        ...state.pagination,
        page: 1,
      };
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination = {
        ...state.pagination,
        page: action.payload,
      }
    }
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
          totalResults: action.payload.totalResults,
        };
      })
      .addCase(fetchFilteredRecipes.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setSearchParams, setPage } = querySlice.actions;
export const selectFilteredRecipes = (state: RootState) => state.query.recipes;
export const selectQueryStatus = (state: RootState) => state.query.status;
export const selectQueryParams = (state: RootState) => state.query.searchParams;
export const selectPagination = (state: RootState) => state.query.pagination;
export default querySlice.reducer;
