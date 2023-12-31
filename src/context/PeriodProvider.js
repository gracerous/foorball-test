import React, { createContext, useContext, useEffect, useState } from 'react';

const PeriodContext = createContext();

export const usePeriod = () => {
  return useContext(PeriodContext);
};

export const PeriodProvider = ({ children }) => {
  const [minTimeStamp, setMinTimeStamp] = useState(Math.floor(new Date().setHours(0, 1, 0, 0) / 1000));
  const [maxTimeStamp, setMaxTimeStamp] = useState(Math.floor(new Date().setHours(23, 59, 59, 999) / 1000));

  useEffect(() => {
    const presentDate = new Date();
    const minTime = new Date(presentDate);
    const maxTime = new Date(presentDate);
    minTime.setHours(0, 0, 1, 0);
    maxTime.setHours(23, 59, 59, 999);
    setMinTimeStamp(Math.floor(minTime.getTime() / 1000));
    setMaxTimeStamp(Math.floor(maxTime.getTime() / 1000));
  }, [])

  return (
    <PeriodContext.Provider
      value={{
        minTimeStamp,
        setMinTimeStamp,
        maxTimeStamp,
        setMaxTimeStamp
      }}
    >
      {children}
    </PeriodContext.Provider>
  );
};