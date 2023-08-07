import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  teams: [],
  leagues: []
};

const mainInfoSlice = createSlice({
  name: 'mainInfo',
  initialState,
  reducers: {
    getTeams: (state, action) => {
      state.teams = action.payload;
    },
    getLeagues: (state, action) => {
      state.leagues = action.payload;
    }
  }
})

export const { getTeams, getLeagues } = mainInfoSlice.actions;
export default mainInfoSlice.reducer;