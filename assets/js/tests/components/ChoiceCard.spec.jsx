import React from "react"
import _merge from "lodash/merge"
import ChoiceCard from "../../components/ChoiceCard"
import { shallow } from "enzyme"
import MenuItem from "material-ui/lib/menus/menu-item"
import SelectField from "material-ui/lib/select-field"
import sinon from "sinon"
import CardHeader from "material-ui/lib/card/card-header"

describe("The ChoiceCard component", () => {
    let wrapper

    const render = (props) => {
        const defaults = {
            onChange: sinon.spy(),
            title: "something",
            value: {"value": 1, "description": "one"},
            choices: [
                {"value": 1, "description": "one"},
                {"value": 2, "description": "two"},
            ]
        }
        const actualProps = _merge({}, defaults, props)
        wrapper = shallow(<ChoiceCard {...actualProps} />)
    }

    beforeEach(() => render())

    it("should render a MenuItem for each choice passed to it plus a null choice", () => {
        const choices = [
            {"value": 1, "description": "one"},
            {"value": 2, "description": "two"},
        ]
        render({choices})
        expect(wrapper.find(MenuItem).length).to.equal(3)
        const wrapperProps = wrapper.find(MenuItem).map(mi => mi.props())
        expect(wrapperProps.map((p) => p.value)).to.deep.equal([null, 1,2])
        expect(wrapperProps.map((p) => p.primaryText)).to.deep.equal([
            "Please choose", "one", "two"])
    })

    it("should call the onChange property when the choice changes", () => {
        const onChange = sinon.spy()
        const choices = [
            {"value": 1, "description": "one"},
            {"value": 2, "description": "two"},
        ]
        render({choices, onChange})
        wrapper.find(SelectField).props().onChange(null, 1, 2)
        expect(onChange).to.have.been.calledWith(choices[1])
    })

    it("should render the title property in the CardHeader", () => {
        render({title: "atitle"})
        expect(wrapper.find(CardHeader).props().title).to.equal("atitle")
    })

    it("should feed the value property through to the select field", () => {
        const choices = [
            {"value": 1, "description": "one"},
            {"value": 2, "description": "two"},
        ]
        render({choices, value: choices[0]})
        expect(wrapper.find(SelectField).props().value).to.equal(1)
    })

    it("should default to the null choice", () => {
        const choices = [
            {"value": 1, "description": "one"},
            {"value": 2, "description": "two"},
        ]
        render({choices, value: null})
        expect(wrapper.find(SelectField).props().value).to.equal(null)
    })

    it("should call the onChange listener with null if the null choice is selected", () => {
        const onChange = sinon.spy()
        render({onChange})
        wrapper.find(SelectField).props().onChange(null, null, null)
        expect(onChange).to.have.been.calledWith(null)
    })
})
