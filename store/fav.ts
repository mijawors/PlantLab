import { createSlice } from "@reduxjs/toolkit";

const favSlice = createSlice({
  name: 'favorites',
  initialState: {
    ids: []
  },
  reducers: {
    addFavorite: (state, action) => {
      state.ids.push(action.payload.id as never);
    },
    removeFavorite: (state, action) => {
      state.ids.splice(state.ids.indexOf(action.payload.id as never, 1));
    }
  }
});

export const addFav = favSlice.actions.addFavorite;
export const removeFav = favSlice.actions.removeFavorite;
export default favSlice.reducer;