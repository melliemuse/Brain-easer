import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import AnxietyRating from './AnxietyRating'
import Login from './login/Login'
import Interventions from './Interventions'

export default class ApplicationViews extends Component {

    render() {
        return (
            <>
                <Route exact path="/" render={props => {
                    return <AnxietyRating {...props}
                    />
                }}/>
                <Route path="/login" render={props => {
                    return <Login {...this.props} {...props}
                    />
                }}/>
                <Route path="/interventions" render={props => {
                    return <Interventions {...props} />
                }}/>

            </>
        )
    }
}