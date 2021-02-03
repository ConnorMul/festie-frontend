import { createSlice } from "@reduxjs/toolkit";



const festivalSlice = createSlice({
    name: "festival",
    initialState: {
      fests: [],
    },
    reducers: {
      addFests: (state, action) => {
        // payload: [sushi, sushi]
        state.fests = action.payload;
      }
    },
  });

  export const { addFests } = festivalSlice.actions

  export default festivalSlice.reducer

  