import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import trendingReducer from '../features/recipes/trendingSlice';
import queryReducer from '../features/recipes/querySlice';
import recipeReducer from '../features/recipes/recipeSlice';

export const store = configureStore({
  reducer: {
    trending: trendingReducer,
    query: queryReducer,
    recipe: recipeReducer,
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
