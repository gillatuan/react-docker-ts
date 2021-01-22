import React, { Fragment, useContext } from "react"
import { DemoContext } from "context/demo/DemoContext"
import { ActionType } from "redux/constants/demo"

const DemoChild = () => {
    const { state, dispatch } = useContext(DemoContext)

    return (
        <Fragment>
            <h1>DemoChild page</h1>
            <p>state.result: {state.result}</p>
        </Fragment>
    )
}

export default DemoChild
