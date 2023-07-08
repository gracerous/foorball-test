// import { SET_DARK_MODE } from "../actions/themeActions";

// const initialState = {
//   darkMode: false,
// };

// export default function themeReducer(state = initialState, action) {
//   switch (action.type) {
//     case SET_DARK_MODE:
//       return {
//         darkMode: action.payload
//       };
//     default:
//       return state;
//   }
// };

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});


export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;