import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';



const API_URL = 'https://footballproject-backend-8de9272134c8.herokuapp.com';
// const seriesLimit = 5;

export const fetchGoalSeries = createAsyncThunk(
  'series/fetchGoalSeries',
  async ({ minTimeStamp, maxTimeStamp, seriesLimit }) => {
    const result = await axios.get(`${API_URL}/mainstat/goal_rival?limit=${seriesLimit}&timestamp_min=${minTimeStamp}&timestamp_max=${maxTimeStamp}`);
    return result.data;
  }
);
export const fetchYCardsSeries = createAsyncThunk(
  'series/fetchYCardsSeries',
  async ({ minTimeStamp, maxTimeStamp, seriesLimit }) => {
    const result = await axios.get(`${API_URL}/mainstat/y_card_rival?limit=${seriesLimit}&timestamp_min=${minTimeStamp}&timestamp_max=${maxTimeStamp}`);
    return result.data;
  }
);

const initialState = {
  goals: {},
  yCards: {},
  // seriesLimit: 0
};

const seriesSlice = createSlice({
  name: 'series',
  initialState,
  reducers: {
    // setSeriesLimit: (state, action) => {
    //   state.seriesLimit = [...action.payload];
    // }
  },
  extraReducers: {
    [fetchGoalSeries.fulfilled]: (state, action) => {
      state.goals = {
        id: 'goals',
        games: [...action.payload]
      }
    },
    [fetchGoalSeries.rejected]: (state, action) => {
      console.log(state, action);
    },
    [fetchYCardsSeries.fulfilled]: (state, action) => {
      state.yCards = {
        id: 'yCards',
        games: [...action.payload]
      };
    }
  },
})

export const { setSeriesLimit } = seriesSlice.actions;
export default seriesSlice.reducer;