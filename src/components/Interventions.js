import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import InterventionCard from './InterventionCard'
import './Interventions.css'

export default class Interventions extends Component {
    state = {
        interventions: []
    }
    componentDidMount = () => {
        APIManager.getAll("interventions")
            .then(interventions => {
                this.setState({
                    interventions: interventions
                })
            })
    }
    render() {
        return (
            <>
                <div className="interventionCardsContainer">
                    {this.state.interventions.map(intervention =>
                        <InterventionCard
                            key={intervention.id}
                            intervention={intervention}
                            {...this.props}
                        />
                    )
                    }
                </div>
            </>
        )
    }

}

