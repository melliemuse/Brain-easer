import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { Typography } from '@material-ui/core'

export default class InterventionCard extends Component {



    render() {
        return (
            <>
            <article>
            <Typography >
                <Link  to={`/interventions/${this.props.intervention.id}`}><h3>{this.props.intervention.name}</h3></Link>
                </Typography>
                {/* <img src={this.props.intervention.icon} alt='icon'></img> */}
            </article>
            </>
        )
    }
}