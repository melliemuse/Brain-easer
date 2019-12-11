import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class InterventionCard extends Component {



    render() {
        return (
            <>
            <article>
                <Link to={`/interventions/${this.props.intervention.id}`}><h3>{this.props.intervention.name}</h3></Link>
                {/* <img src={this.props.intervention.icon} alt='icon'></img> */}
            </article>
            </>
        )
    }
}