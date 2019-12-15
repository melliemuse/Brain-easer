import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import  '../../assets/logo_sm.png'
import './NavBar.css'


class NavBar extends Component {

render() {
    return(
        <>
        {/* <img id="logo" alt="logo" src={require('../../assets/logos/logo3.png')}></img>
      <img id="logo" alt="logo" src={require('../../assets/logos/logo2.png')}></img>  */}
        <nav>
            <ul> 
                {this.props.user ?
                <>
                <li><Link to='/'><img id="logo-text" alt="logo" src={require('../../assets/logos/logo.png')}></img></Link></li>
                <li><Link to='/'><img id="logo" alt="logo" src={require('../../assets/logoPainted.png')}></img></Link></li>
                <div className="nav-container">
                <li className="nav"><Link to='/'>Rate Anxiety</Link></li>
                <li className="nav"><Link to='/charts'>Anxiety Tracker</Link></li>
                <li className="nav"><Link to='/interventions'>Interventions</Link></li>
                <li className="nav"><Link to='/journal'>Create Journal Entry</Link></li>
                <li className="nav"><Link to='/journal/entries'>My Journal Entries</Link></li>
                </div>
                </>
                : null}
            </ul>
        </nav>
        </>
    )
}

}


export default NavBar