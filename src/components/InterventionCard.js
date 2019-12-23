import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { Typography } from '@material-ui/core'
import Card from '@material-ui/core/Card';

export default class InterventionCard extends Component {



    render() {
        return (
            <>
                <Card id="interventionCard">
                <Link className="interventionLink"  to={`/interventions/${this.props.intervention.id}`}>
                    <h3 className="interventionName">{this.props.intervention.name}</h3>
                    </Link>
                {/* <img src={this.props.intervention.icon} alt='icon'></img> */}
                </Card>
            </>
        )
    }
}