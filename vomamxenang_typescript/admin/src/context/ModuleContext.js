import { createContext, useReducer } from "react"

import { ModuleReducer, initialState } from 'redux/reducers/ModuleReducer'

export const ModuleContext = createContext()

export const ModuleProvider = ({children}) => {
  const [state, dispatch] = useReducer(ModuleReducer, initialState)

  return (
    <ModuleContext.Provider value={{ state, dispatch }}>
      {children}
    </ModuleContext.Provider>
  )
}
