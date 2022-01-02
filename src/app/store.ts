import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import trendingReducer from '../features/recipes/trendingSlice';
import queryReducer from '../features/recipes/querySlice';

export const store = configureStore({
  reducer: {
    trending: trendingReducer,
    query: queryReducer,
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
