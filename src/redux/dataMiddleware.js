import axios from 'axios';
import { setCurrentGames } from './actions/gamesActions';
import { getTeams, getLeagues } from './actions/mainInfoActions';
import { setGoalSeries, setSeriesLimit } from './actions/seriesActions';

const API_URL = 'https://footballproject-backend-8de9272134c8.herokuapp.com';
// const minTimeStamp = Math.floor(Date.now() / 1000);
const minTimeStamp = 1659462300
const maxTimeStamp = minTimeStamp + 7892160;
const limit = 5;

export const fetchTeamsAndLeagues = () => {
  return dispatch => {
    return axios.all([
      // axios.get(`${API_URL}/mainstat/goal?limit=5&timestamp_min=${minTimeStamp}&timestamp_max=${maxTimeStamp}`),
      axios.get(`${API_URL}/teams`),
      axios.get(`${API_URL}/leagues`)
    ])
    .then(axios.spread((teamsResponse, leaguesResponse) => {
      dispatch(setSeriesLimit(limit));
      dispatch(getTeams(teamsResponse.data));
      dispatch(getLeagues(leaguesResponse.data));
    }));
  };
};

export const fetchGoalSeries = (minTimeStamp, maxTimeStamp) => {
  return dispatch => {
    axios.get(`${API_URL}/mainstat/goal_rival?limit=${limit}&timestamp_min=${minTimeStamp}&timestamp_max=${maxTimeStamp}`)
    .then(result => dispatch(setGoalSeries(result.data)));
  }
}
