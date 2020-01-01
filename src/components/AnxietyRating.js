import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ButtonGroup from '@material-ui/core/ButtonGroup';




export default class AnxietyRating extends Component {
    state = {
        anxietyScore: "",
        description: "",
        interventionId: "",
        addDescriptionField: true,
        addSelfCareField: true,
        interventions: []
    }

    componentDidMount(event) {
        APIManager.getAll("interventions")
            .then(interventions => {
                this.setState({
                    interventions: interventions
                })
            })
    }

    handleFieldChange = event => {
        event.preventDefault()
        const stateToChange = {}
        stateToChange[event.currentTarget.id] = event.currentTarget.value
        this.setState(stateToChange)
    }

    createbuttons = () => {
        let buttons = []
        for (let i = 0; i < 10; i++) {
            buttons.push(
                <Button id="anxietyScore"  value={i + 1} onClick={this.handleFieldChange} key={i + 1}>{i + 1}</Button>
            )
        }
        return buttons
    }

    setBoolean = (event) => {
        const stateToChange = {}
        stateToChange[event.currentTarget.id] = !event.currentTarget.id
        this.setState(stateToChange)
    }

    createAnxietyRating = () => {
        if (this.state.anxietyScore === "") {
            alert("Please select an anxiety score")
        } else if (this.state.interventionId === "") {
            const anxiety = {
                "anxietyScore": parseInt(this.state.anxietyScore),
                "timestamp": new Date(),
                "userId": parseInt(localStorage.getItem("activeUser")),
                "description": this.state.description
            }
            APIManager.post("baselineAnxietyScores", anxiety)
                .then(anxiety.anxietyScore > 3 ? this.props.history.push("/interventions") : null)
        } else {
            const anxiety = {
                "userId": parseInt(localStorage.getItem("activeUser")),
                "interventionId": parseInt(this.state.interventionId),
                "timestamp": new Date(),
                "anxietyScore": parseInt(this.state.anxietyScore),
                "description": this.state.description
            }
            APIManager.post("userInterventions", anxiety)
                .then(anxiety.anxietyScore > 3 ? this.props.history.push("/interventions") : null)
        }
    }

    render() {
        return (
            <div className="main text-center homeMain">
                <div  className="main-container">
                <header className="header">
                <h1 id="anxiety-rating-welcome">Welcome to Brain Easer!</h1>
                <img id="main-logo" alt="logo" src={require('../assets/Logo.png')}></img>
                </header>
                <article id="anxiety-rate-container">
                    <h2 id="anxiety-rating-scale">How is your anxiety on a scale from 1 - 10?</h2>
                    <div className="rating-buttons">
                        {/* <ButtonGroup variant="text" color="primary"> */}
                        {this.createbuttons()}
                        {/* </ButtonGroup> */}
                        </div>
                        
                        <footer className="footer-buttons">
                        <div className="descriptionField" hidden={this.state.addDescriptionField}>
                            <TextField variant="outlined" color="secondary"
                                id="description"
                                hidden={this.state.addDescriptionField}
                                onChange={this.handleFieldChange}
                            /> </div>
                            <ButtonGroup className="button-group" variant="contained" aria-label="outlined primary button group">
                                <Button
                                    id="addDescriptionField"
                                    name="addDescriptionField"
                                    className="button"
                                    // color="secondary"
                                    onClick={this.setBoolean}
                                >Add Description</Button>
                                <Button
                                    id="addSelfCareField"
                                    className="button"
                                    onClick={this.setBoolean}
                                >Log Self-Care</Button>
                            </ButtonGroup>
                            <div hidden={this.state.addSelfCareField}>
                                <FormControl>
                                    <Select id="interventionId" name="interventionId" hidden={this.state.addSelfCareField} onChange={this.handleFieldChange}>
                                        {this.state.interventions.map(intervention =>
                                            <MenuItem key={intervention.id} value={intervention.id}>{intervention.name}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </div>
                            
                            <div>
                                <Button
                                    variant="contained"
                                    className="button submit"
                                    id="submit-rating"
                                    color="secondary"
                                    onClick={this.createAnxietyRating}
                                >Submit Rating
                </Button>
                            </div>
                            </footer>
                </article>
                </div>
                    </div>
                
        )
    }
}