import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AnxietyRating from './AnxietyRating'
import Login from './login/Login'
import Interventions from './Interventions'
import InterventionDetails from './InterventionDetails'
import JournalNewEntryForm from './Journal-CRUD/JournalNewEntryForm'
import JournalList from './Journal-CRUD/JournalList'
import JournalEditForm from './Journal-CRUD/JournalEditForm'
import ChartList from '../charts/ChartList'

export default class ApplicationViews extends Component {

    render() {
        return (
            <>
                <Route exact path="/" render={props => {  
                    if (this.props.user) {
                        return <AnxietyRating {...props}/>
                    } else {
                        return <Redirect to="/login" />
                    }
                }}/>
                <Route path="/login" render={props => {
                    if (! this.props.user) {
                        return <Login {...this.props} {...props}/>
                    } else {
                        return <Redirect to="/" />
                    } 
                }}/>
                <Route exact path="/interventions" render={props => {
                    if (this.props.user) {
                        return <Interventions {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }}/>
                <Route exact path="/interventions/:interventionId(\d+)" render={props => {
                    if (this.props.user) {
                        return <InterventionDetails {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route exact path="/journal" render={props => {
                    if (this.props.user) {
                        return <JournalNewEntryForm {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route exact path="/journal/entries" render={props => {
                    if (this.props.user) {
                        return <JournalList {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route path="/journal/entries/:journalId(\d+)" render={props => {
                    if (this.props.user) {
                        return <JournalEditForm {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route exact path="/charts" render={props => {
                    if (this.props.user) {
                        return <ChartList {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
            </>
        )
    }
}