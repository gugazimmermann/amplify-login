import React, { createContext, useReducer } from "react";
import { STATENAME } from "../constants";
import AppReducer from "./reducers";

const initial = { lang: "en-US" };

const getStaste = () =>
  localStorage.getItem(STATENAME)
    ? JSON.parse(localStorage.getItem(STATENAME))
    : initial;

const mainReducer = (state, action) => AppReducer(state, action);

const AppContext = createContext({ state: getStaste(), dispatch: () => null });

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(mainReducer, getStaste());
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppProvider, AppContext };
