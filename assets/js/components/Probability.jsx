import React from "react"
import Paper from "material-ui/lib/paper"


export default function Probability({probability, loading}){
    let text = `${(probability * 100).toPrecision(4)}%`
    if (loading) {
        text = "Loading"
    }
    return <div className="probability" >
        <p>Probability of Acceptance</p>
        <Paper className="probability--paper" zDepth={4} circle={true}>
            <p>{text}</p>
        </Paper>
    </div>
}

Probability.propTypes = {
    probability: React.PropTypes.number,
    loading: React.PropTypes.bool,
}
