import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import trendingReducer from '../features/trending/trendingSlice';

export const store = configureStore({
  reducer: {
    trending: trendingReducer,
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
