import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class InterventionCard extends Component {



    render() {
        return (
            <>
                    <Link className="interventionLink" to={`/interventions/${this.props.intervention.id}`}>
                <Card id="interventionCard">
                        <h3 className="interventionName">{this.props.intervention.name}</h3>
                    <div className="intervention-icon">
                    <FontAwesomeIcon icon={this.props.intervention.icon} size='2x'/>
                    </div>
                </Card>
                    </Link>
            </>
        )
    }
}