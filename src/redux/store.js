import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import seriesReducer from './reducers/seriesSlice';
import mainInfoReducer from './reducers/mainInfoSlice';
import themeReducer from './reducers/themeSlice';

const store = configureStore({
  reducer: {
    mainInfo: mainInfoReducer,
    series: seriesReducer,
    theme: themeReducer
  },
  middleware: [thunk]
});

export default store;