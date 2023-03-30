import { configureStore } from '@reduxjs/toolkit'
import favReducer from './fav';
import waterReducer from './water';
import sunReducer from './sun';
import plantsReducer from './plants';

export const store = configureStore({
  reducer: {
    favorites: favReducer,
    water: waterReducer,
    sun: sunReducer,
    plants: plantsReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>