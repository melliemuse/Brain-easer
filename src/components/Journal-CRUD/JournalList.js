import React, {Component} from 'react'
import APIManager from '../../modules/APIManager'
import JournalCard from './JournalCard'

export default class JournalList extends Component {
    state = {
        entries: []
    }
componentDidMount() {
    const currentUser = localStorage.getItem("activeUser")
    APIManager.getWith("users", currentUser, "journals")
    .then(entries => {
        console.log(entries)
        // this.setState({entries: entries})
    })
}

render() {
    console.log(this.state.entries)
    return (
        <>
        <h1>Hello</h1>
        <JournalCard
        entries={this.entries}
        {...this.props}
        />
        </>
    )
}
}