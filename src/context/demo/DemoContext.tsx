import { createContext, Dispatch } from "react"

import { initialState } from "redux/reducers/DemoReducer"
import { ICounter } from "context/demo/DemoContext.d"

export const DemoContext = createContext<{
    state: ICounter
    dispatch: Dispatch<any>
}>({ state: initialState, dispatch: () => null })
