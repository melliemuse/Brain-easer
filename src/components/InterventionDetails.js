import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import InterventionRerate from './InterventionRerate'

export default class InterventionDetails extends Component {
    state = {
        intervention: [],
        displayRerate: false
    }

    componentDidMount() {
        APIManager.get("interventions", this.props.match.params.interventionId)
            .then(intervention => {
                this.setState({
                    intervention: intervention
                })
            })
    }

    // handleClick = event => {
        //     event.preventDefault()
        //     // const completedSelfCare = {
        //     //     userId: parseInt(localStorage.getItem("activeUser")),
        //     //     timestamp: new Date(),
        //     //     interventionId: this.state.intervention.id,
        //     //     description: "",
        //     //     anxietyScore: ""
        //     // }
        //     // APIManager.post("userInterventions", completedSelfCare)

        //     this.state.intervention.id === 7 ? 
        //         this.props.history.push("/journal")
        //     // : this.props.history.push("/")
        //     : 

        // if (this.state.intervention.id === 7) {
        //     this.props.history.push("/journal")
        // } else {
        //     {event.preventDefault()}
        //     return <InterventionRerate {...this.props}/>
        // }
        // }
    displayRerate = () => {
        this.setState({
            displayRerate: !this.state.displayRerate
        })
    }

        render() {
            console.log(this.state.intervention)
            return (
                <>
                    <article className="intervention-details">
                        <h1>{this.state.intervention.name}</h1>
                        <div>
                            <h3>Description</h3>
                            <p>{this.state.intervention.description}</p>
                        </div>
                        <div>
                            <h3>Instructions</h3>
                            <p>{this.state.intervention.instructions}</p>
                        </div>
                        <button
                            onClick={() => {
                                // debugger
                                if (this.state.intervention.id === 7) {
                                    this.props.history.push("/journal")
                                } else {
                                    this.displayRerate()
                                }
                            }
                        }
                        >Complete this intervention!</button>
                        {this.state.displayRerate &&  
                        <InterventionRerate intervention={this.state.intervention} {...this.props} />}
                    </article>
                </>
            )
        }
}