import { createSlice } from "@reduxjs/toolkit";

const sunSlice = createSlice({
  name: 'sun',
  initialState: {
    sun: 0
  },
  reducers: {
    addSun: (state, action) => {
      state.sun = action.payload.sun as never
    }
  }
});

export const addSun = sunSlice.actions.addSun;
export default sunSlice.reducer;