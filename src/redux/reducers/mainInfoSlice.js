import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://footballproject-backend-8de9272134c8.herokuapp.com';

export const getMainInfo = createAsyncThunk(
  'mainInfo/getMainInfo',
  async () => {
    try {
      const [teamsResponse, leaguesResponse] = await Promise.all([
        axios.get(`${API_URL}/teams`),
        axios.get(`${API_URL}/leagues`),
      ]);
      return {
        teams: teamsResponse.data,
        leagues: leaguesResponse.data,
      };
    } catch (error) {
      throw error;
    }
  }
);

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMainInfo.fulfilled, (state, action) => {
        state.teams = action.payload.teams;
        state.leagues = action.payload.leagues;
      });
  },
})

export const { getTeams, getLeagues } = mainInfoSlice.actions;
export default mainInfoSlice.reducer;