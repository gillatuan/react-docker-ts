import React, { FC, useReducer } from 'react';

import { DemoContext } from "context/demo/DemoContext"
import { DemoReducer, initialState } from "redux/reducers/DemoReducer";

export const DemoProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(DemoReducer, initialState)

  return (
      <DemoContext.Provider value={{ state, dispatch }}>
          {/* useReducer returns the state and a dispatch function to update state */}
          {children}
      </DemoContext.Provider>
  )
}
