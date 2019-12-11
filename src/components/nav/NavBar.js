import React, {Component} from 'react'
import {Link} from 'react-router-dom'


class NavBar extends Component {

render() {
    return(
        <>
        <nav>
            <ul>
                {this.props.user ?
                <>
                <li><Link to='/'>Rate Anxiety</Link></li>
                <li><Link to='/interventions'>Interventions</Link></li>
                </>
                : null}
            </ul>
        </nav>
        </>
    )
}

}


export default NavBar