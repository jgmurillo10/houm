import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import trendingReducer from '../store/recipes/trendingSlice';
import queryReducer from '../store/recipes/querySlice';
import recipeReducer from '../store/recipes/recipeSlice';
import wishlistReducer from '../store/recipes/wishlistSlice';
import metaReducer from '../store/meta/metaSlice';

export const store = configureStore({
  reducer: {
    trending: trendingReducer,
    query: queryReducer,
    recipe: recipeReducer,
    wishlist: wishlistReducer,
    meta: metaReducer,
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
