import React, { createContext, useState, useContext } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [routes, setRoutes] = useState([]);

  return (
    <DataContext.Provider value={{ routes, setRoutes }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);