import React from "react"
import { ICounter, IReducer } from "context/demo/DemoContext.d"
import { ActionType } from "redux/constants/demo"

export const initialState: ICounter = {
    result: 0,
}

export const DemoReducer: React.Reducer<ICounter, IReducer> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ActionType.INCREMENT_COUNTER:
          debugger
            state = { result: state.result + action.payload }
            break
        case ActionType.DECREMENT_COUNTER:
            state = { result: state.result - action.payload }
            break
        default:
            break
    }

    return state
}
