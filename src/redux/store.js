import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// import gamesReducer from './reducers/gamesReducer';
import seriesReducer from './reducers/seriesReducer';
import mainInfoReducer from './reducers/mainInfoReducer';
// import teamsReducer from './reducers/teamsReducer';
import themeSlice from './reducers/themeSlice';

const reducers = combineReducers({
  // games: gamesReducer,
  mainInfo: mainInfoReducer,
  series: seriesReducer,
  theme: themeSlice
});


const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(thunk))
);

export default store;