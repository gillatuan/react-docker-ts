import React, { Fragment, useContext } from "react"
import { DemoContext } from "context/demo/DemoContext"
import { ActionType } from "redux/constants/demo"
import DemoChild from "pages/DemoChild"

const Demo = () => {
    const { state, dispatch } = useContext(DemoContext)

    return (
        <Fragment>
            <h1>Demo page</h1>
            <button
                onClick={() =>
                    dispatch({
                        type: ActionType.INCREMENT_COUNTER,
                        payload: 1
                    })
                }
            >+</button>
            <button
                onClick={() =>
                    dispatch({
                        type: ActionType.DECREMENT_COUNTER,
                        payload: 1
                    })
                }
            >-</button>
            <p>state.result: {state.result}</p>
            <DemoChild />
        </Fragment>
    )
}

export default Demo
