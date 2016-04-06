import React from "react"
import { shallow } from "enzyme"
import _merge from "lodash/merge"
import {PureApp as App} from "../../components/App"
import ChoiceCard from "../../components/ChoiceCard"
import sinon from "sinon"
import Probability from "../../components/Probability"

describe("The App component", () => {
    let wrapper

    const render = (props) => {
        const defaults = {
            ethnicities: [{description: "choice1", value: "1"}],
            sexes: [{description: "choice1", value: "1"}],
            fetchAcceptanceProbability: sinon.spy(),
            acceptanceProbability: null,
            loading: false,
        }
        const actualProps = _merge({}, defaults, props)
        wrapper = shallow(<App {...actualProps} />)
    }
    const getEthnicityCard = () => wrapper.find(ChoiceCard).at(0)
    const chooseEthnicity = (ethnicity) => getEthnicityCard().props().onChange(ethnicity)
    const getSexCard = () => wrapper.find(ChoiceCard).at(1)
    const chooseSex = (sex) => getSexCard().props().onChange(sex)

    beforeEach(() => render())

    it("should initially render null for sex and ethnicity", () => {
        expect(getEthnicityCard().props().value).to.be.null
        expect(getSexCard().props().value).to.be.null
    })

    it("should display the ethnicities choices in a ChoiceCard", () => {
        const ethnicities = [{description: "Choice1", value: 1}]
        render({ethnicities})
        const props = getEthnicityCard().props()
        expect(props.choices).to.deep.equal(ethnicities)
    })

    it("should display the sexes as a choicecard", () => {
        const sexes = [
            {description: "choice1", value: "1"},
            {description: "choice2", value: "2"},
        ]
        render({sexes})
        const props = getSexCard().props()
        expect(props.choices).to.deep.equal(sexes)
    })

    it("should update the value of the ethnicities card when choosing", () => {
        const ethnicities = [
            {description: "Choice1", value: 1},
            {description: "Choice2", value: 2},
        ]
        render({ethnicities})
        chooseEthnicity(ethnicities[1])
        wrapper.update()
        expect(getEthnicityCard().props().value).to.deep.equal(ethnicities[1])
    })

    it("should update the value of the sex card when choosing", () => {
        const sexes = [
            {description: "Choice1", value: 1},
            {description: "Choice2", value: 2},
        ]
        render({sexes})
        chooseSex(sexes[1])
        wrapper.update()
        expect(getSexCard().props().value).to.deep.equal(sexes[1])
    })

    it("should dispatch a fetchAcceptanceProbability action when both choices are made", () => {
        const sexes = [
            {description: "Choice1", value: "sex1"},
        ]
        const ethnicities = [
            {description: "Choice1", value: "eth1"},
        ]
        const fetchAcceptanceProbability = sinon.spy()
        render({sexes, ethnicities, fetchAcceptanceProbability})
        chooseSex(sexes[0])
        chooseEthnicity(ethnicities[0])
        expect(fetchAcceptanceProbability).to.have.been.calledWith("sex1", "eth1")
    })


    describe("when the probability is loading", () => {
        it("should render the probability container as loading", () => {
            render({loading: true})
            expect(wrapper.find(Probability).props().loading).to.be.true
        })
    })

    describe("When the probability is loaded", () => {
        it("should render the probability container with the value", () => {
            render({loading: true, acceptanceProbability: 0.23})
            expect(wrapper.find(Probability).props().probability).to.equal(0.23)
        })
    })

    describe("when the probability is not loading but has no value", () => {
        it("should not render the probability container", () => {
            render({loading: false, acceptanceProbability: null})
            expect(wrapper.find(Probability).length).to.equal(0)
        })
    })
})
