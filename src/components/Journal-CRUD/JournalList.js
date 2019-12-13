import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'
import JournalCard from './JournalCard'

export default class JournalList extends Component {
    state = {
        journals: []
    }
    componentDidMount() {
        const currentUser = localStorage.getItem("activeUser")
        // http://localhost:5002/journals?userId=1&_expand=prompt
        APIManager.getEntriesPromptsByUser("journals", currentUser, "prompt")
            .then(journals => {
                console.log(journals)
                this.setState({ journals: journals })
            })
    }
    handleDelete = id => {
        const currentUser = localStorage.getItem("activeUser")
        APIManager.delete("journals", id)
        .then(() => {
            APIManager.getEntriesPromptsByUser("journals", currentUser, "prompt")
            .then(journals => {
                console.log("journals post-delete", journals)
                this.setState({ journals: journals })
            })
        })
    }
    render() {
        console.log(this.state.journals[0])
        return (
            <>
                <h1>My Journal Entries</h1>
                <div>
                    {this.state.journals.map(journal =>
                        <JournalCard
                            key={journal.id}
                            journals={journal}
                            handleDelete={this.handleDelete}
                            {...this.props}
                        />)}
                </div>
            </>
        )
    }
}