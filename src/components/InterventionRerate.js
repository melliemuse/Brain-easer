import React, {Component} from 'react'
import APIManager from '../modules/APIManager'


export default class InterventionRerate extends Component {
    state = {
        anxietyScore: "",
        description: "",
        interventionId: ""
    }
    // componentDidMount() {
    //     // http://localhost:5002/userInterventions?userId=1&interventionId=2
    //     const currentUser = localStorage.getItem("activeUser")
    //     APIManager.getUserInterventions("userInterventions", currentUser, this.props.intervention.id) 
    //     .then(interventions => {
    //         console.log("interventions data", interventions)
    //         this.setState({
    //             interventions: interventions
    //         })
    //     })
    //     console.log(this.state.interventions)
    // }
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
        console.log(this.props.interventions[this.props.interventions.length-1].id)
        if (this.state.anxietyScore === "") {
            alert("Please select an anxiety score")
        }  else {
            const anxiety = {
                "userId": parseInt(localStorage.getItem("activeUser")),
                "interventionId": parseInt(this.props.intervention.id),
                "timestamp": this.props.interventions[this.props.interventions.length-1].timestamp,
                "anxietyScore": parseInt(this.state.anxietyScore),
                "description": this.state.description,
                "id": Number(this.props.interventions[this.props.interventions.length-1].id)
            }
            console.log("anxiety rerate object", anxiety)
            APIManager.update("userInterventions", anxiety)
                .then(anxiety.anxietyScore > 3 ? this.props.history.push("/interventions") : null)
        }
    }

    render() {
        console.log("all returned ints of type", this.props.interventions)
        console.log("last completed int of type", this.props.interventions[this.props.interventions.length-1])
        // console.log([this.state.interventions[length-1].id])
        return (
            <>
                <h2>Congratulations!</h2>
                <h4>Now rerate your anxiety to track your progress</h4>
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