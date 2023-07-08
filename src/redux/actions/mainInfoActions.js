export const GET_TEAMS = 'GET_TEAMS';
export const GET_LEAGUES = 'GET_LEAGUES';

export const getTeams = teams => ({ type: GET_TEAMS, payload: teams });
export const getLeagues = leagues => ({ type: GET_LEAGUES, payload: leagues });