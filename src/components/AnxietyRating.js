import React, { Component } from 'react'



export default class AnxietyRating extends Component {
    state = {
        anxietyScore: "",
        addDescriptionField: true,
        addSelfCareField: true,
    }

    componentDidMount(event) {
        
    }

    handleFieldChange = event => {
        event.preventDefault()
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    createbuttons = () => {
        let buttons = []
        for (let i = 0; i < 11; i++) {
           buttons.push(
               <button id="anxietyScore" value={i+1} onClick={this.handleFieldChange} key={i}>{i + 1}</button>    
           )
        }
        return buttons
    }

    setBoolean = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = false
        this.setState(stateToChange)
    }

    createAnxietyRating = () => {

    }

    render() {
        return (
            <>
                <h1>How is Your Anxiety?</h1>
                {this.createbuttons()}
                <button
                id="addDescriptionField"
                onClick={this.setBoolean}
                >Add Description</button>
                <input
                hidden={this.state.addDescriptionField}
                />
                <button
                id="addSelfCareField"
                onClick={this.setBoolean}
                >Log Self-Care</button>
                <input
                hidden={this.state.addSelfCareField}
                />
                <button
                onClick={this.createAnxietyRating}
                >Submit Rating
                </button>
            </>
        )
    }
}