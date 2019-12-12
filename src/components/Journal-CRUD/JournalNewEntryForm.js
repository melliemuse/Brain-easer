import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'

export default class JournalNewEntryForm extends Component {
    state = {
        prompts: [],
        entry: "",
        randomPrompt: {},
        hidePrompt: true
    }

    componentDidMount() {
        APIManager.getAll("prompts")
            .then(prompts => {
                console.log(prompts)
                this.setState({
                    prompts: prompts
                })
            })
    }


    generatePrompt = event => {
        event.preventDefault()
        const min = 1;
        const max = 5;
        const random = Math.floor(min + Math.random() * (max - min));
        this.setState({
            hidePrompt: false,
            randomPrompt: this.state.prompts[random],
        });
    }
    handleFieldChange = event => {
        event.preventDefault()
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }
    createEntry = event => {
        event.preventDefault()
        if (this.state.entry === "") {
            window.alert("Please complete entry field before submitting")
        } else {
            const entry = {
                entry: this.state.entry,
                timestamp: new Date(),
                userId: parseInt(localStorage.getItem("activeUser")),
                promptId: this.state.randomPrompt.id
            }
            APIManager.post("journals", entry)
                .then(() => this.props.history.push("/journal/entries"))
        }

    }

    render() {
        console.log(this.state.prompts)
        console.log("random prompt", this.state.randomPrompt)
        return (
            <>
                <form>
                    <h1>New Journal Entry</h1>
                    <fieldset>
                        <button onClick={this.generatePrompt}>Generate Prompt</button>
                        <header
                            className="prompt"
                            hidden={this.state.hidePrompt}>{this.state.randomPrompt.prompt}</header>
                        <input
                            id="entry"
                            onChange={this.handleFieldChange}
                        />
                        <div>
                        <button
                            onClick={this.createEntry}>
                            Submit Entry</button>
                        </div>
                    </fieldset>
                </form>


            </>
        )

    }
}