import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import InterventionCard from './InterventionCard'

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
        // console.log(this.state.interventions)
        return (
            <>
                <div className="intervention-cards">
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

