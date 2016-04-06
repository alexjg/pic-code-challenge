import acceptanceProbability from "../../reducers/acceptanceProbability"
import { FETCH_ACCEPTANCE_PROBABILITY } from "../../actions/fetchAcceptanceProbability"

describe("The acceptanceProbability reducer", () => {
    it("should initially return null and loading: false", () => {
        const action = {type: "SOMETHING"}
        expect(acceptanceProbability(undefined, action)).to.deep.equal({
            value: null,
            loading: false,
        })
    })

    it("should return loading: true, value: null when the fetchAcceptanceProbability action begins", () => {
        const action = {
            type: FETCH_ACCEPTANCE_PROBABILITY,
            meta: {sequence: "BEGIN"},
        }
        expect(acceptanceProbability({value:12.34, loading:false}, action)).to.deep.equal({
            value: null,
            loading: true,
        })
    })

    it("should set the value and loading to false when the action completes", () => {
        const action = {
            type: FETCH_ACCEPTANCE_PROBABILITY,
            meta: {sequence: "COMPLETE"},
            payload: {value: 33.44},
        }
        expect(acceptanceProbability({loading: true, value: 12.34}, action)).to.deep.equal({
            value: 33.44,
            loading: false,
        })
    })
})
