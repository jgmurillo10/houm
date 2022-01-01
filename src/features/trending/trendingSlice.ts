import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { RecipeI } from '../../common/types';
import fetchRandomRecipes from './trendingAPI';

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
    const response = await fetchRandomRecipes();
    return response.data.recipes;
  }
);

export const trendingSlice = createSlice({
  name: 'trending',
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<RecipeI>) => {
      state.recipes.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        console.log('loading')
        state.status = 'loading';
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        console.log('idle')
        state.status = 'idle';
        state.recipes.push(...action.payload);
      })
      .addCase(fetchRecipes.rejected, (state) => {
        console.log('failed', state)
        state.status = 'failed';
      });
  },
});

export const { incrementByAmount } = trendingSlice.actions;
export const selectTrending = (state: RootState) => state.trending.recipes;
export const selectTrendingStatus = (state: RootState) => state.trending.status;
export default trendingSlice.reducer;
