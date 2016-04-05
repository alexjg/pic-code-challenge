import React from "react"
import { render } from "react-dom"
import { createStore, applyMiddleware, combineReducers } from "redux"
import logger from "redux-logger"
import {Provider} from "react-redux"
import App from "./components/App"

const chanceReducer = (action, state) => {
    return null
}
const rootReducer = combineReducers({chanceReducer})

const store = createStore(rootReducer, {}, applyMiddleware(logger))


const appContainer = document.getElementById("container")

render(
    <Provider store={store}>
        <App />
    </Provider>,
    appContainer,
)
