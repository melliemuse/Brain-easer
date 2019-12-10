import React, {Component} from 'react'
import './Braineaser.css'
import NavBar from './components/nav/NavBar'
import ApplicationViews from './components/ApplicationViews'

class Braineaser extends Component {
    state = {
        users: []
    }

componentDidMount() {

}

render() {
    return(
        <>
        <NavBar />
        <ApplicationViews/>
        </>
    )
}

}


export default Braineaser