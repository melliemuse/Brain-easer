import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InterventionRerate from '../InterventionRerate'
import './Journal.css'

export default class JournalNewEntryForm extends Component {
    state = {
        prompts: [],
        entry: "",
        randomPrompt: {},
        hidePrompt: true,
        displayRerate: false,
        interventions: {},
        intervention: []
    }

    componentDidMount() {
        APIManager.getAll("prompts")
            .then(prompts => {
                console.log(prompts)
                this.setState({
                    prompts: prompts
                })
            })
            .then(() => APIManager.get("interventions", 7))
            .then(intervention => {
                console.log("INTERVENTIONS", intervention)
                this.setState({intervention: intervention})
            })
    }

    generatePrompt = event => {
        event.preventDefault()
        const min = 0;
        const max = this.state.prompts.length;
        const random = Math.floor(min + Math.random() * (max - min));
        this.setState({
            hidePrompt: false,
            randomPrompt: this.state.prompts[random],
        });
    }
    handleFieldChange = event => {
        event.preventDefault()
        const stateToChange = {}
        stateToChange[event.currentTarget.id] = event.currentTarget.value
        this.setState(stateToChange)
    }
    createEntry = event => {
        event.preventDefault()
        if (this.state.entry === "") {
            window.alert("Please complete entry field before submitting")
        } else if (this.state.randomPrompt === {}) {
            window.alert("Please generate a prompt before submitting")
        } else {
            const entry = {
                entry: this.state.entry,
                timestamp: new Date(),
                userId: parseInt(localStorage.getItem("activeUser")),
                promptId: this.state.randomPrompt.id
            }
            console.log(entry)
            APIManager.post("journals", entry)
                .then(() => this.handleClick())
        }
    }
    handleClick = () => {
        const currentUser = localStorage.getItem("activeUser")
        const completedSelfCare = {
            userId: parseInt(currentUser),
            timestamp: new Date(),
            interventionId: this.state.intervention.id,
            description: "",
            anxietyScore: ""
        }
        APIManager.post("userInterventions", completedSelfCare)
            .then(intervention => APIManager.get("userInterventions", intervention.id)
                .then(interventions => {
                    this.setState({
                        interventions: interventions
                    })
                }))
            .then(this.setState({
                displayRerate: !this.state.displayRerate
            }))
    }

    render() {
        return (
            <div className="main">
                <form>
                    <h1>New Journal Entry</h1>
                    <fieldset>
                        <Button className="button" onClick={this.generatePrompt}>Generate Prompt</Button>
                        <header
                            className="prompt"
                            >{this.state.randomPrompt.prompt}</header>

                        <TextField variant="outlined"
                            id="entry"
                            onChange={this.handleFieldChange}
                        />
                        <div>
                            <Button
                            className="button"
                                onClick={this.createEntry}>
                                Submit Entry</Button>
                        </div>
                    </fieldset>
                </form>
                {this.state.displayRerate &&
                        <InterventionRerate intervention={this.state.intervention}
                            interventions={[this.state.interventions]} {...this.props} />}

            </div>
        )

    }
}