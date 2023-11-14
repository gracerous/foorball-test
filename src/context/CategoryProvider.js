import React, { createContext, useContext, useState, useSelector } from 'react';

const CategoryContext = createContext();

export const useCategory = () => {
  return useContext(CategoryContext);
};

export const CategoryProvider = ({ children }) => {
  const [category, setCategory] = useState('Забивает голы');

  return (
    <CategoryContext.Provider
      value={{
        category,
        setCategory
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};