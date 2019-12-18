import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import Button from '@material-ui/core/Button';


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
        stateToChange[event.currentTarget.id] = event.currentTarget.value
        this.setState(stateToChange)
    }

    createbuttons = () => {
        let buttons = []
        for (let i = 0; i < 10; i++) {
            buttons.push(
                <Button id="anxietyScore" value={i + 1} onClick={this.handleFieldChange} key={i + 1}>{i + 1}</Button>
            )
        }
        buttons.unshift()
        return buttons
    }

    setBoolean = (event) => {
        // debugger
        const stateToChange = {}
        stateToChange[event.currentTarget.id] = false
        this.setState(stateToChange)
        console.log(stateToChange)
        console.log(this.state.addSelfCareField)
    }

    createAnxietyRating = () => {
        console.log("Let's submit this sucker!")
        console.log(localStorage.getItem("activeUser"))
        if (this.state.anxietyScore === "") {
            alert("Please select an anxiety score")
        } else if (this.state.interventionId === "") {
            const anxiety = {
                "anxietyScore": parseInt(this.state.anxietyScore),
                "timestamp": new Date(),
                "userId": parseInt(localStorage.getItem("activeUser")),
                "description": this.state.description
            }
            APIManager.post("baselineAnxietyScores", anxiety)
                .then(anxiety.anxietyScore > 3 ? this.props.history.push("/interventions") : null)
        } else {
            const anxiety = {
                "userId": parseInt(localStorage.getItem("activeUser")),
                "interventionId": parseInt(this.state.interventionId),
                "timestamp": new Date(),
                "anxietyScore": parseInt(this.state.anxietyScore),
                "description": this.state.description
            }
            APIManager.post("userInterventions", anxiety)
                .then(anxiety.anxietyScore > 3 ? this.props.history.push("/interventions") : null)
        }
    }

    render() {
        return (
                <div className="main">
                <h1>Welcome to Brain Easer!</h1>
                <h2>How is your anxiety on a scale from 1 - 10?</h2>
                <div className="rating-buttons">
                {this.createbuttons()}
                </div>
                
                    <Button
                        id="addDescriptionField"
                        name="addDescriptionField"
                        className="button"
                        onClick={this.setBoolean}
                    >Add Description</Button>
                
                
                    <input
                        id="description"
                        hidden={this.state.addDescriptionField}
                        onChange={this.handleFieldChange}
                    />
                
                    <Button
                        color="secondary"
                        id="addSelfCareField"
                        className="button"
                        onClick={this.setBoolean}
                    >Log Self-Care</Button>
                
                
                    <select id="interventionId" name="interventionId" hidden={this.state.addSelfCareField} onChange={this.handleFieldChange}>
                        {this.state.interventions.map(intervention =>
                            <option key={intervention.id} value={intervention.id}>{intervention.name}</option>
                        )}
                    </select>
                
                <Button
                className="button"
                    color="primary"
                    onClick={this.createAnxietyRating}
                >Submit Rating
                </Button>
                </div>
        )
    }
}