import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import trendingReducer from '../features/recipes/trendingSlice';
import queryReducer from '../features/recipes/querySlice';
import recipeReducer from '../features/recipes/recipeSlice';
import wishlistReducer from '../features/recipes/wishlistSlice';

export const store = configureStore({
  reducer: {
    trending: trendingReducer,
    query: queryReducer,
    recipe: recipeReducer,
    wishlist: wishlistReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
