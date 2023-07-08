import { GET_TEAMS, GET_LEAGUES } from "../actions/mainInfoActions";

const initialState = {
  teams: [],
  leagues: []
};

export default function mainInfoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TEAMS:
      return {
        ...state,
        teams: action.payload
      };
    case GET_LEAGUES:
      return {
        ...state,
        leagues: action.payload
      };
    default:
      return state;
  }
};
