import { createSlice } from "@reduxjs/toolkit";

const waterSlice = createSlice({
  name: 'water',
  initialState: {
    water: 0
  },
  reducers: {
    addWater: (state, action) => {
      state.water = action.payload.water as never;
    },
  }
});

export const addWater = waterSlice.actions.addWater;
export default waterSlice.reducer;