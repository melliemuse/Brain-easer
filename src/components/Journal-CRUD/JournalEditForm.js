import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'

export default class JournalEditForm extends Component {
    state = {
        journal: "",
        prompt: "",
        entry: "",
        promptId: ""
    }
    componentDidMount() {
        APIManager.getWith("journals", this.props.match.params.journalId, "prompt")
            .then(journal => {
                this.setState({
                    journal: journal,
                    entry: journal.entry,
                    prompt: journal.prompt.prompt,
                    promptId: journal.prompt.id
                })
            })
    }
    handleFieldChange = event => {
        event.preventDefault()
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }
    createUpdatedEntry = event => {
        event.preventDefault()
        if (this.state.entry === "") {
            window.alert("Please enter a change before hitting submit")
        } else {
            const entry = {
                id: Number(this.props.match.params.journalId),
                userId: parseInt(localStorage.getItem("activeUser")),
                entry: this.state.entry,
                promptId: this.state.promptId
            }
            APIManager.update("journals", entry)
            .then(() => this.props.history.push("/journal/entries"))
        }
    }

    render() {
        console.log("this.state", this.state)
        return (
            <>
                <h3>{this.state.prompt}</h3>
                <form>
                    <fieldset>
                        <input 
                            id="entry"
                            type="text"
                            value={this.state.entry}
                            onChange={this.handleFieldChange}
                        />
                        <div>
                            <button
                            onClick={this.createUpdatedEntry}
                            >Submit</button>
                        </div>
                    </fieldset>
                </form>
            </>
        )
    }
}