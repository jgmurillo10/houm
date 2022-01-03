import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { RecipeI } from '../../common/types';

export interface WishListState {
  recipes: RecipeI[];
};

const StorageItem = 'favorite_recipes';
/**
 * TODO(jgmurillo10): Sanitize local storage value before parsing because of
 * high security risks here.
 */
const initialState: WishListState = {
  recipes: JSON.parse(localStorage.getItem(StorageItem) || '[]'),
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    resetRecipe: (state) => {
      state.recipes = [];
    },
    toggleWishList: (state, action : PayloadAction<RecipeI>) => {
      const newRecipe = action.payload;
      const index =
        state.recipes.findIndex((recipe) => recipe.id === newRecipe.id);

      if (index >= 0) {
        state.recipes.splice(index, 1);
      } else {
        state.recipes.push(action.payload);
      }

      localStorage.setItem(StorageItem, JSON.stringify(state.recipes));
    }
  },
});

export const { toggleWishList } = wishlistSlice.actions;
export const selectRecipes = (state: RootState) => state.wishlist.recipes;
export default wishlistSlice.reducer;
