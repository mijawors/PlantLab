import { createSlice } from "@reduxjs/toolkit";
import { PLANTS } from "../data/dummy-plants";
import { IPlants } from "../models/plant";

const plantsSlice = createSlice({
  name: 'plants',
  initialState: {
    plants: [...PLANTS]
  },
  reducers: {
    setPlants: (state, action) => {
      state.plants.push(...action.payload)
    },
    addPlant: (state, action) => {
      state.plants.push({...action.payload} as IPlants);
    },
    deletePlant: (state, action) => {
      return {plants: state.plants.filter((plants: any) => plants.id.toString() !== action.payload.toString()) as any}
    },
    updatePlant: (state, action) => {
      const { id, ...updatedFields } = action.payload;
      const plantIndex = state.plants.findIndex(plant => plant.id === id);
      if (plantIndex >= 0) {
        state.plants[plantIndex] = {...state.plants[plantIndex], ...updatedFields};
      }
    }
  }
});

export const deletePlant = plantsSlice.actions.deletePlant;
export const addPlant = plantsSlice.actions.addPlant;
export const updatePlant = plantsSlice.actions.updatePlant;
export const setPlants = plantsSlice.actions.setPlants;
export default plantsSlice.reducer;