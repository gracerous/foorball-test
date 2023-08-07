import axios from 'axios';
import { getTeams, getLeagues } from './reducers/mainInfoSlice';
import { setGoalSeries, setYCardsSeries, setSeriesLimit } from './actions/seriesActions';

const API_URL = 'https://footballproject-backend-8de9272134c8.herokuapp.com';
const limit = 5;

// export const fetchTeamsAndLeagues = () => {
//   return dispatch => {
//     return axios.all([
//       axios.get(`${API_URL}/teams`),
//       axios.get(`${API_URL}/leagues`)
//     ])
//       .then(axios.spread((teamsResponse, leaguesResponse) => {
//         dispatch(setSeriesLimit(limit));
//         dispatch(getTeams(teamsResponse.data));
//         dispatch(getLeagues(leaguesResponse.data));
//       }));
//   };
// };

export const fetchGoalSeries = (minTimeStamp, maxTimeStamp) => {
  return dispatch => {
    axios.get(`${API_URL}/mainstat/goal_rival?limit=${limit}&timestamp_min=${minTimeStamp}&timestamp_max=${maxTimeStamp}`)
      .then(result => dispatch(setGoalSeries(result.data)));
  }
}
export const fetchYCardsSeries = (minTimeStamp, maxTimeStamp) => {
  return dispatch => {
    axios.get(`${API_URL}/mainstat/y_card_rival?limit=${limit}&timestamp_min=${minTimeStamp}&timestamp_max=${maxTimeStamp}`)
      .then(result => dispatch(setYCardsSeries(result.data)));
  }
}
