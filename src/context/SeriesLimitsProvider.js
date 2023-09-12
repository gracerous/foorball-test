import React, { createContext, useContext, useState } from 'react';

const SeriesLimitsContext = createContext();

export const useSeriesLimits = () => {
  return useContext(SeriesLimitsContext);
};

export const SeriesLimitsProvider = ({ children }) => {
  const [goalSeriesLimit, setGoalSeriesLimit] = useState(5);
  const [yCardsSeriesLimit, setYCardsSeriesLimit] = useState(5);
 
  return (
    <SeriesLimitsContext.Provider
      value={{
        goalSeriesLimit,
        setGoalSeriesLimit,
        yCardsSeriesLimit,
        setYCardsSeriesLimit
      }}
    >
      {children}
    </SeriesLimitsContext.Provider>
  );
};