import React, { Component } from 'react'
import APIManager from '../modules/APIManager'


export default class AnxietyRating extends Component {
    state = {
        anxietyScore: "",
        description: "",
        interventionId: "",
        addDescriptionField: true,
        addSelfCareField: true,
        interventions: []
    }

    componentDidMount(event) {
        APIManager.getAll("interventions")
        .then(interventions => {
            this.setState({
                interventions: interventions
            })
        })
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
                <button id="anxietyScore" value={i + 1} onClick={this.handleFieldChange} key={i+1}>{i + 1}</button>
            )
        }
        return buttons
    }

    setBoolean = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = false
        this.setState(stateToChange)
    }

    createAnxietyRating = () => {
        console.log("Let's submit this sucker!")
        console.log(localStorage.getItem("activeUser"))
        if (this.state.anxietyScore === "") {
            alert("Please select an anxiety score")
        } else if (this.state.interventionId === "") {
            const anxiety = {
                "anxietyScore": this.state.anxietyScore,
                "timestamp": new Date(),
                "userId": parseInt(localStorage.getItem("activeUser")),
                "description": this.state.description
            }
            APIManager.post("baselineAnxietyScores", anxiety)
            .then(anxiety.anxietyScore > 3 ? this.props.history.push("/interventions") : null)
        } else {
            const anxiety = {
                "userId": parseInt(localStorage.getItem("activeUser")),
                "interventionId": this.state.interventionId,
                "timestamp": new Date(),
                "anxietyScore": this.state.anxietyScore,
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
                    id="addSelfCareField"
                    onClick={this.setBoolean}
                >Log Self-Care</button>
                <div>
                    
                <select id="interventionId" name="interventionId" hidden={this.state.addSelfCareField} onChange={this.handleFieldChange}>
                    {this.state.interventions.map(intervention => 
                        <option key={intervention.id} value={intervention.id}>{intervention.name}</option>
                    )}
                </select>
                </div>
                <button
                    onClick={this.createAnxietyRating}
                >Submit Rating
                </button>
            </>
        )
    }
}