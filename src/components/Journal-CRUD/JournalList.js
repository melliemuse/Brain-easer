import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'
import JournalCard from './JournalCard'

export default class JournalList extends Component {
    state = {
        journals: []
    }
    componentDidMount() {
        // debugger
        const currentUser = localStorage.getItem("activeUser")
        APIManager.getPromptsEntriesByUser("prompts", "journals", currentUser)
            .then(journals => {
                console.log(journals)
                this.setState({ journals: journals })
            })
    }

    render() {
        console.log("Jisie", this.state.journals)
        console.log(this.state.journals[0])
        return (
            <>
                <h1>My Journal Entries</h1>
                <div>
                    {this.state.journals.map(journal =>
                        <JournalCard
                            key={journal.id}
                            journals={journal}
                            {...this.props}
                        />)}
                </div>
            </>
        )
    }
}