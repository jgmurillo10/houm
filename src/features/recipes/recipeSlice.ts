import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { RecipeI } from '../../common/types';
import { getRecipeInformation, getRelatedRecipes } from './recipesAPI';

export interface RecipeState {
  recipe: RecipeI | null;
  status: 'idle' | 'loading' | 'failed';
  related: [];
};

const initialState: RecipeState = {
  recipe: null,
  status: 'idle',
  related: [],
};

export const fetchRelatedRecipes = createAsyncThunk(
  'recipe/fetchRelatedRecipes',
  async (recipeId : string) => {
    const response = await getRelatedRecipes(recipeId);

    return response.data;
  }
);

export const fetchRecipe = createAsyncThunk(
  'recipe/fetchRecipe',
  async (recipeId : string) => {
    const response = await getRecipeInformation(recipeId);

    return response.data;
  }
);

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipe.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipe.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload)
        state.recipe = action.payload;
      })
      .addCase(fetchRecipe.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchRelatedRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRelatedRecipes.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload)
        state.related = action.payload;
      })
      .addCase(fetchRelatedRecipes.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectRecipe = (state: RootState) => state.recipe.recipe;
export const selectRelatedRecipes = (state: RootState) => state.recipe.related;
export const selectStatus = (state: RootState) => state.recipe.status;
export default recipeSlice.reducer;
