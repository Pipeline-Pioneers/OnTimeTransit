import React, { createContext, useState, useEffect } from "react";
import { ApiService } from "../services/ApiService";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [routes, setRoutes] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    ApiService.getRoutes().then(setRoutes).catch(console.error);
    ApiService.getSchedules().then(setSchedules).catch(console.error);
    ApiService.getTickets().then(setTickets).catch(console.error);
  }, []);

  return (
    <DataContext.Provider value={{ routes, schedules, tickets }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => React.useContext(DataContext);