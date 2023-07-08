// import { SET_CURRENT_GAMES } from "../actions/gamesActions";
import { SET_GOAL_SERIES, SET_SERIES_LIMIT } from "../actions/seriesActions";

const initialState = {
  goals: [],
  seriesLimit: 0
};

export default function seriesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GOAL_SERIES:
      return {
        ...state,
        goals: action.payload
      };
      case SET_SERIES_LIMIT:
        return {
          ...state,
          seriesLimit: action.payload
        }
    default:
      return state;
  }
};
