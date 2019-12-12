import React, {Component} from 'react'
import APIManager from '../../modules/APIManager'

export default class JournalList extends Component {
    state = {

    }
componentDidMount() {
    const currentUser = localStorage.getItem("activeUser")
    APIManager.getWith("users", currentUser, "journals")
    .then(entries => {
        console.log(entries)
    })
}

render() {
    return (
        <>
        </>
    )
}
}