import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { Typography } from '@material-ui/core'
import  '../../assets/logo_sm.png'
import './NavBar.css'
// import Navbar from 'react-bootstrap/Navbar'
// import Nav from 'react-bootstrap/Navbar'
// import NavDropdown from 'react-bootstrap/Navbar'


class NavBar extends Component {

render() {
    return(
        <>
        {/* <img id="logo" alt="logo" src={require('../../assets/logos/logo3.png')}></img> */}
      {/* <img id="logo" alt="logo" src={require('../../assets/logos/logo2.png')}></img>  */}
      {/* <div id="lockup"> */}
                {/* <li><Link to='/'><img id="logo-text" alt="logo" src={require('../../assets/Braineaser_Logo.png')}></img></Link></li> */}
                {/* </div> */}
                {/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#home">Brain Easer</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
      <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Nav>
      <Nav.Link href="#deets">More deets</Nav.Link>
      <Nav.Link eventKey={2} href="#memes">
        Dank memes
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar> */}
        <nav>
            <ul> 
                {this.props.user ?
                <>
                <Typography >
                <div className="nav-container">
                <li id="lockup"><Link to='/'><img id="logo" alt="logo" src={require('../../assets/logoPainted.png')}></img></Link></li>
                <li className="nav"><Link to='/'>Rate Anxiety</Link></li>
                <li className="nav"><Link to='/charts'>Anxiety Tracker</Link></li>
                <li className="nav"><Link to='/interventions'>Interventions</Link></li>
                <li className="nav"><Link to='/journal'>Create Journal Entry</Link></li>
                <li className="nav"><Link to='/journal/entries'>My Journal Entries</Link></li>
                </div>
                </Typography>
                </>
                : null}
            </ul>
        </nav>
        </>
    )
}

}


export default NavBar