import React from "react"
import Card from "material-ui/lib/card/card"
import CardHeader from "material-ui/lib/card/card-header"
import CardText from "material-ui/lib/card/card-text"
import SelectField from "material-ui/lib/select-field"
import MenuItem from "material-ui/lib/menus/menu-item"

export default function ChoiceCard({choices, onChange, title, value}){
    const onChangeSelectField = (event, index, value) => {
        if (value === null) {
            onChange(null)
            return
        }
        choices.forEach((c) => {
            if (c.value === value) {
                onChange(c)
            }
        })
    }
    let selectedValue = null
    if (value) {
        selectedValue = value.value
    }
    return <Card>
        <CardHeader
            title={title}/>
        <CardText>
            <SelectField value={selectedValue} onChange={onChangeSelectField}>
                <MenuItem key="nochoice" value={null} primaryText="Please choose" />
                {choices.map(({value, description}) => <MenuItem key={value} value={value} primaryText={description} />)}
            </SelectField>
        </CardText>
    </Card>
}

ChoiceCard.propTypes = {
    title: React.PropTypes.string,
    value: React.PropTypes.object,
    choices: React.PropTypes.array,
    onChange: React.PropTypes.func,
}
