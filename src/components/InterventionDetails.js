import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import InterventionRerate from './InterventionRerate'

export default class InterventionDetails extends Component {
    state = {
        interventions: {},
        intervention: [],
        displayRerate: false,
        completedSelfCare: {}
    }

    componentDidMount() {
        APIManager.get("interventions", this.props.match.params.interventionId)
            .then(intervention => {
                this.setState({
                    intervention: intervention
                })
            })
    }

    handleClick = () => {
        const currentUser = localStorage.getItem("activeUser")
        const completedSelfCare = {
            userId: parseInt(currentUser),
            timestamp: new Date().toLocaleDateString("en-EN", {month: "short", weekday: "short", day: "2-digit", year: "numeric", hour: "2-digit"}),
            interventionId: this.state.intervention.id,
            description: "",
            anxietyScore: ""
        }
        APIManager.post("userInterventions", completedSelfCare)
            .then(intervention => APIManager.get("userInterventions", intervention.id)
                .then(interventions => {
                    console.log("interventions data", interventions)
                    this.setState({
                        interventions: interventions
                    })
                    console.log(this.state.interventions)
                }))
                .then(this.setState({
                    displayRerate: !this.state.displayRerate
                }))
    }

    render() {
        console.log(this.state.intervention)
        return (
            <>
                <article className="intervention-details">
                    <h1>{this.state.intervention.name}</h1>
                    <div>
                        <p>{this.state.intervention.description}</p>
                    </div>
                    <div>
                        <h3>Instructions</h3>
                        <p>{this.state.intervention.instructions}</p>
                    </div>
                    <button
                        onClick={() => {
                            if (this.state.intervention.id === 7) {
                                this.props.history.push("/journal")
                            } else {
                                this.handleClick()
                                // this.displayRerate()
                            }
                        }
                        }
                    >Complete this intervention!</button>
                    {this.state.displayRerate &&
                        <InterventionRerate intervention={this.state.intervention}
                            interventions={[this.state.interventions]} {...this.props} />}
                </article>
            </>
        )
    }
}