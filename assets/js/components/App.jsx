import React, {Component} from "react"
import AppBar from "material-ui/lib/app-bar"
import ChoiceCard from "./ChoiceCard"
import { connect } from "react-redux"
import update from "react-addons-update"
import fetchAcceptanceProbability from "../actions/fetchAcceptanceProbability"
import Probability from "./Probability"


class App extends Component {
    static propTypes = {
        ethnicities: React.PropTypes.array,
        sexes: React.PropTypes.array,
        fetchAcceptanceProbability: React.PropTypes.func,
        loading: React.PropTypes.bool,
        acceptanceProbability: React.PropTypes.number,
    }
    onChangeEthnicity = (ethnicity) => {
        this.setState(
            update(this.state, {ethnicity: {$set: ethnicity}}),
            this.maybeDispatchFetch,
        )
    }
    onChangeSex = (sex) => {
        this.setState(
            update(this.state, {sex: {$set: sex}}),
            this.maybeDispatchFetch,
        )
    }
    maybeDispatchFetch = () => {
        const {sex, ethnicity} = this.state
        if (sex && ethnicity) {
            this.props.fetchAcceptanceProbability(sex.value, ethnicity.value)
        }
    }
    constructor(props){
        super()
        this.state = {
            ethnicity: null,
            sex: null,
        }
    }
    render () {
        const {ethnicities, sexes, loading, acceptanceProbability} = this.props
        const {sex, ethnicity} = this.state
        let probability = <Probability loading={loading} probability={acceptanceProbability}/>
        if (!loading && (acceptanceProbability === null)) {
            probability = null
        }
        return <div className="max-size-column">
            <AppBar />
            <div className="cards">
                <ChoiceCard
                    choices={ethnicities}
                    title="Ethnicity"
                    value={ethnicity}
                    onChange={this.onChangeEthnicity} />
                <ChoiceCard
                    choices={sexes}
                    title="Sex"
                    value={sex}
                    onChange={this.onChangeSex} />
            </div>
            <div className="probability-container">
                {probability}
            </div>
        </div>
    }
}

export { App as PureApp }
export default connect(
    (state) => {
        return {
            ethnicities: state.ethnicities,
            sexes: state.sexes,
            loading: state.acceptanceProbability.loading,
            acceptanceProbability: state.acceptanceProbability.value,
        }
    },
    (dispatch) => {
        return {
            fetchAcceptanceProbability: (sex, ethnicity) => dispatch(fetchAcceptanceProbability(sex, ethnicity))
        }
    }
)(App)
