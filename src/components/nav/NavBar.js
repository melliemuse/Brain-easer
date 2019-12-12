import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import  '../../assets/logo_sm.png'
import './NavBar.css'


class NavBar extends Component {

render() {
    return(
        <>
        <img id="logo" alt="logo" src={require('../../assets/logo_sm.png')}></img>
        <nav>
            <ul> 
                {this.props.user ?
                <>
                <li><Link to='/'>Rate Anxiety</Link></li>
                <li><Link to='/interventions'>Interventions</Link></li>
                <li><Link to='/journal'>Create Journal Entry</Link></li>
                <li><Link to='/journal/entries'>My Journal Entries</Link></li>
                </>
                : null}
            </ul>
        </nav>
        </>
    )
}

}


export default NavBar