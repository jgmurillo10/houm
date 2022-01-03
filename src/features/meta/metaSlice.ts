import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { MetadataI } from '../../common/types';

export interface PaginationI {
  page: number;
  totalResults: number;
};

const initialState: MetadataI = {
  title: 'Cheff',
  subtitle: 'Home',
  description: 'Food recipes made easy.',
  image: 'https://houm.vercel.app/recipe_hero.jpg',
};

export const metaSlice = createSlice({
  name: 'meta',
  initialState,
  reducers: {
    setSubtitle: (state, action: PayloadAction<string>) => {
      state.subtitle = action.payload
    },
    setImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload
    },
  },
});

export const { setSubtitle, setImage } = metaSlice.actions;
export const selectMeta = (state: RootState) => state.meta;
export default metaSlice.reducer;
