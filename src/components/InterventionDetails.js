import React, {Component} from 'react'
import APIManager from '../modules/APIManager'

export default class InterventionDetails extends Component {
    state = {
        intervention: []
    }

    componentDidMount() {
        APIManager.get("interventions", this.props.match.params.interventionId)
        .then(intervention => {
            this.setState({
                intervention: intervention
            })
        })
    }

    handleClick = event => {
        event.preventDefault()
        // const completedSelfCare = {
        //     userId: parseInt(localStorage.getItem("activeUser")),
        //     timestamp: new Date(),
        //     interventionId: this.state.intervention.id,
        //     description: "",
        //     anxietyScore: ""
        // }
        // APIManager.post("userInterventions", completedSelfCare)
        .then(() => this.props.history.push("/"))
    }

    render() {
        console.log(this.state.intervention)
        return (
            <>
            <article className="intervention-details">
                <h1>{this.state.intervention.name}</h1>
                <div>
                    <h2>Description</h2>
                <p>{this.state.intervention.description}</p>
                </div>
                <div>
                    <h2>Instructions</h2>
                <p>{this.state.intervention.instructions}</p>
                </div>
                <button
                onClick={this.handleClick}
                >Complete this intervention!</button>
                </article>
            </>
        )
    }
}