import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://footballproject-backend-8de9272134c8.herokuapp.com';

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
  goals: {
    isLoading: false,
    id: 'goals',
    data:{}
  },
  yCards: {
    isLoading: false,
    id: 'yCards',
    data:{}
  }
};

const seriesSlice = createSlice({
  name: 'series',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    [fetchGoalSeries.pending]: (state) => {
      state.goals = {
        ...state,
        isLoading: true
      };
    },
    [fetchGoalSeries.fulfilled]: (state, action) => {
      state.goals = {
        isLoading: false,
        id: 'goals',
        categoryName: 'Забивает голы',
        games: [...action.payload],
      };
    },
    [fetchGoalSeries.rejected]: (state, action) => {
      console.log(state, action);
      state.goals = {
        ...state,
        isLoading: false
      };
    },
    [fetchYCardsSeries.pending]: (state) => {
      state.yCards = {
        ...state,
        isLoading: true,
      };
    },
    [fetchYCardsSeries.fulfilled]: (state, action) => {
      state.yCards = {
        isLoading: false,
        id: 'yCards',
        categoryName: 'Получает желтые карточки',
        games: [...action.payload],
      };
    },
    [fetchYCardsSeries.rejected]: (state, action) => {
      console.log(state, action);
      state.yCards = {
        ...state,
        isLoading: false,
      };
    },
  }
})

export const { setSeriesLimit } = seriesSlice.actions;
export default seriesSlice.reducer;