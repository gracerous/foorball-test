export const SET_GOAL_SERIES = 'SET_GOAL_SERIES';
export const SET_SERIES_LIMIT = 'SET_SERIES_LIMIT';
export const SET_YCARDS_SERIES = 'SET_YCARDS_SERIES';

export const setGoalSeries = goalSeries => ({ type: SET_GOAL_SERIES, payload: goalSeries });
export const setSeriesLimit = limit => ({ type: SET_SERIES_LIMIT, payload: limit });
export const setYCardsSeries = yCardsSeries => ({ type: SET_YCARDS_SERIES, payload: yCardsSeries });