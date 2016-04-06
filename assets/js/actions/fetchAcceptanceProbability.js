import {bind} from "redux-effects"
import {fetch} from "redux-effects-fetch"
import {createAction} from "redux-actions"

export const FETCH_ACCEPTANCE_PROBABILITY = "FETCH_ACCEPTANCE_PROBABILITY"

export const fetchAction = (sex, ethnicity) => {
    return fetch(`/acceptance_probability?sex=${sex}&ethnicity=${ethnicity}`,{
        credentials: "same-origin",
        headers: {
            "Accept": "application/json",
        },
        method: "GET",
    })
}

export const loadingAction = createAction(
    FETCH_ACCEPTANCE_PROBABILITY,
    payload => payload,
    () => {return {sequence: "BEGIN"}}
)

export const completeAction = createAction(
    FETCH_ACCEPTANCE_PROBABILITY,
    payload => payload.value,
    () => {return {sequence: "COMPLETE"}},
)

export const failureAction = createAction(
    FETCH_ACCEPTANCE_PROBABILITY,
    payload => payload,
    () => {return {sequence: "COMPLETE"}},
)

export default function fetchAcceptanceProbability(sex, ethnicity){
    return [
        loadingAction(),
        bind(
            fetchAction(sex, ethnicity),
            completeAction,
            failureAction
        )
    ]
}

