import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import Button from '@material-ui/core/Button';
// import { createMuiTheme } from '@material-ui/core/styles';

// const theme = createMuiTheme({
//     palette: {
//         common: {
//             black: "#000", white: "#fff"
//         },
//         background: {
//             paper: "#fff",
//             default: "#fafafa"
//         },
//         primary: {
//             light: "rgba(218, 190, 251, 1)",
//             main: "rgba(145, 29, 249, 1)",
//             dark: "rgba(93, 5, 171, 1)",
//             contrastText: "#fff"
//         },
//         secondary: {
//             light: "rgba(41, 180, 253, 1)",
//             main: "rgba(63, 0, 245, 1)",
//             dark: "rgba(4, 68, 145, 1)",
//             contrastText: "rgba(255, 255, 255, 1)"
//         },
//         error: {
//             light: "#e57373",
//             main: "rgba(235, 28, 33, 1)",
//             dark: "#d32f2f",
//             contrastText: "#fff"
//         },
//         text: {
//             primary: "rgba(0, 0, 0, 0.87)",
//             secondary: "rgba(0, 0, 0, 0.54)",
//             disabled: "rgba(0, 0, 0, 0.38)",
//             hint: "rgba(0, 0, 0, 0.38)"
//         }
//     },
// });


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
                <button id="anxietyScore" value={i + 1} onClick={this.handleFieldChange} key={i + 1}>{i + 1}</button>
            )
        }
        return buttons
    }

    setBoolean = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = false
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
            <>
                <h1>Welcome to Brain/easer!</h1>
                <h2>How is your anxiety on a scale from 1 - 10?</h2>
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
                <div
                >
                <button
                    variant="contained"
                    color="primary"
                    id="addSelfCareField"
                    onClick={this.setBoolean}
                >Log Self-Care</button>
                </div>
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