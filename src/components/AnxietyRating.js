import React, { Component } from 'react'
import APIManager from '../modules/APIManager'


export default class AnxietyRating extends Component {
    state = {
        anxietyScore: "",
        description: "",
        interventionId: "",
        addDescriptionField: true,
        addSelfCareField: true,
        baselineAnxietyScores: "baselineAnxietyScores",
        interventions: []
    }

    componentDidMount(event) {
        APIManager.getAll(this.state.interventions)
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
                <button id="anxietyScore" value={i + 1} onClick={this.handleFieldChange} key={i}>{i + 1}</button>
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
                "userId": localStorage.getItem("activeUser"),
                "description": this.state.description
            }
            APIManager.post(this.state.baselineAnxietyScores, anxiety)
        } else {
            const anxiety = {
                "userId": localStorage.getItem("activeUser"),
                // "interventionId": ,
                "timestamp": new Date(),
                "anxietyScore": this.state.anxietyScore
            }
            // APIManager.post(userInterventions, anxiety)
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
                    hidden={this.state.addDescriptionField}
                />
                </div>
                <button
                    id="addSelfCareField"
                    onClick={this.setBoolean}
                >Log Self-Care</button>
                <div>
                    
                <select name="interventionId" hidden={this.state.addSelfCareField}>
                    <option value="1">Deep Breathing</option>
                    <option value="2">Exercise</option>
                    <option value="3">Feel Feelings</option>
                    <option value="4">Gratitude</option>
                    <option value="5">Grounding</option>
                    <option value="6">Comforting Inner Child</option>
                    <option value="7">Journaling</option>
                    <option value="8">Meditation</option>
                    <option value="9">Physical Touch</option>
                    <option value="10">Social Support</option>
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