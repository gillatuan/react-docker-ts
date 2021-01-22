import React from "react"
import { DemoProvider } from "context/demo/DemoProvider"

import "./App.css"
import Demo from "pages/Demo"

export const App = () => {
    return (
        <DemoProvider>
            {/* useReducer returns the state and a dispatch function to update state */}
            <Demo />
        </DemoProvider>
    )
}
