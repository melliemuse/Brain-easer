import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import AnxietyRating from './AnxietyRating'
import Login from './login/Login'

export default class ApplicationViews extends Component {

    render() {
        return (
            <>
                <Route path="/" render={props => {
                    return <AnxietyRating {...props}
                    />
                }}/>
                <Route path="/login" render={props => {
                    return <Login {...props}
                    />
                }}/>


            </>
        )
    }
}