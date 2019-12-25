import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import  '../../assets/logo_sm.png'
import './NavBar.css'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';



class NavBar extends Component {
  // SimpleMenu = () => {
  //   const [anchorEl, setAnchorEl] = React.useState(null);
  
  //   const handleClick = event => {
  //     setAnchorEl(event.currentTarget);
  //   };
  
  //   const handleClose = () => {
  //     setAnchorEl(null);
  //   };
  // }

render() {
    return(
        <>
        <nav className="navBar">
        {/* <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={this.SimpleMenu.handleClick}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            Rate
          </Typography>
          <Menu
        id="simple-menu"
        anchorEl={this.SimpleMenu.anchorEl}
        keepMounted
        open={Boolean(this.SimpleMenu.anchorEl)}
        onClose={this.SimpleMenu.handleClose}
      >
        <MenuItem onClick={this.SimpleMenu.handleClose}>Profile</MenuItem>
        <MenuItem onClick={this.SimpleMenu.handleClose}>My account</MenuItem>
        <MenuItem onClick={this.SimpleMenu.handleClose}>Logout</MenuItem>
      </Menu>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div> */}
            <ul> 
                {this.props.user ?
                <>
                <div >
                <Typography className="nav-container">
                {/* <li className="nav logo"><Link to='/'><img id="logo" alt="logo" src={require('../../assets/logos/newLogo.png')}></img></Link></li> */}
                <li className="nav"><Link className="navlink"  to='/'>Rate Anxiety</Link></li>
                <li className="nav"><Link className="navlink"  to='/charts'>Anxiety Tracker</Link></li>
                <li className="nav"><Link className="navlink"  to='/interventions'>Interventions</Link></li>
                <li className="nav"><Link className="navlink"  to='/journal'>Create Journal Entry</Link></li>
                <li className="nav"><Link className="navlink" to='/journal/entries'>My Journal Entries</Link></li>
                </Typography>
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