import { SET_CURRENT_GAMES } from "../actions/gamesActions";

const initialState = {
  currentGames: [],
};

export default function gamesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_GAMES:
      return {
        ...state,
        currentGames: action.payload
      };
    default:
      return state;
  }
};
