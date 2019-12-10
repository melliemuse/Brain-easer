import React, {Component} from 'react'


export default class InterventionCard extends Component {

    render() {
        return (
            <>
            <article>
                <h3>{this.props.intervention.name}</h3>
            </article>
            </>
        )
    }
}