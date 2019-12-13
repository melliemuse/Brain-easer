import React, {Component} from 'react'
import APIManager from '../modules/APIManager'


export default class InterventionRerate extends Component {
    state = {
        anxietyScore: "",
        description: "",
        interventionId: ""
    }
    handleFieldChange = event => {
        event.preventDefault()
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }
    createbuttons = () => {
        let buttons = []
        for (let i = 0; i < 10; i++) {
            buttons.push(
                <button id="anxietyScore" value={i + 1} onClick={this.handleFieldChange} key={i + 1}>{i + 1}</button>
            )
        }
        return buttons
    }
    createAnxietyRating = () => {
        if (this.state.anxietyScore === "") {
            alert("Please select an anxiety score")
        }  else {
            const anxiety = {
                "userId": parseInt(localStorage.getItem("activeUser")),
                "interventionId": parseInt(this.props.intervention.id),
                "timestamp": this.props.intervention.timestamp,
                "anxietyScore": parseInt(this.state.anxietyScore),
                "description": this.state.description
            }
            APIManager.post("userInterventions", anxiety)
                .then(anxiety.anxietyScore > 3 ? this.props.history.push("/interventions") : null)
        }
    }

    render() {
        return (
            <>
                <h1>How is Your Anxiety?</h1>
                {this.createbuttons()}
                <div>
                    <button
                        id="addDescriptionField"
                        onClick={this.setBoolean}
                    >Add Description</button>
                </div>
                <div>
                    <input
                        id="description"
                        hidden={this.state.addDescriptionField}
                        onChange={this.handleFieldChange}
                    />
                </div>
                <button
                    onClick={this.createAnxietyRating}
                >Submit Rating
                </button>
            </> 
        )
    }
}