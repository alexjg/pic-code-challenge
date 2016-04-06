import {handleActions} from "redux-actions"
import { FETCH_ACCEPTANCE_PROBABILITY } from "../actions/fetchAcceptanceProbability" //eslint-disable-line no-unused-vars

export default handleActions({
    FETCH_ACCEPTANCE_PROBABILITY: (state, action) => {
        if (action.meta.sequence === "BEGIN") {
            return {loading: true, value: null}
        }
        if (action.meta.sequence === "COMPLETE") {
            return {loading: false, value: action.payload.value}
        }
        return state
    }
}, {loading: false, value: null})
