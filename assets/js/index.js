import injectTapEventPlugin from "react-tap-event-plugin" //eslint-disable-line no-unused-vars
injectTapEventPlugin()

import React from "react"
import { render } from "react-dom"
import { createStore, applyMiddleware, combineReducers } from "redux"
import createLogger from "redux-logger"
import {Provider} from "react-redux"
import App from "./components/App"
import multi from "redux-multi"
import effects from "redux-effects"
import fetch from "redux-effects-fetch"
import acceptanceProbability from "./reducers/acceptanceProbability"

const ethnicities = (action, state) => {
    return [
        {description: "Asian", value: "asian"},
        {description: "Black", value: "black"},
        {description: "Mixed", value: "mixed"},
        {description: "White", value: "white"},
        {description: "Other", value: "other"},
    ]
}
const sexes = (action, state) => {
    return [
        {description: "Male", value: "male"},
        {description: "Female", value: "female"},
    ]
}
const rootReducer = combineReducers({acceptanceProbability, sexes, ethnicities})

const store = createStore(
    rootReducer,
    {},
    applyMiddleware(multi, effects, fetch, createLogger())
)

const appContainer = document.getElementById("container")

render(
    <Provider store={store}>
        <App />
    </Provider>,
    appContainer,
)
