import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { RecipeI } from '../../common/types';
import { getRecipes } from './recipesAPI';

export interface TrendingState {
  recipes: Array<RecipeI>;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: TrendingState = {
  recipes: [],
  status: 'idle',
};

export const fetchRecipes = createAsyncThunk(
  'trending/fetchRecipes',
  async () => {
    const response = await getRecipes();
    return response.data.recipes;
  }
);

export const trendingSlice = createSlice({
  name: 'trending',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'idle';
        state.recipes.push(...action.payload);
      })
      .addCase(fetchRecipes.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectTrending = (state: RootState) => state.trending.recipes;
export const selectTrendingStatus = (state: RootState) => state.trending.status;
export default trendingSlice.reducer;
