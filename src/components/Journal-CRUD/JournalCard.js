import React, { Component } from 'react'


export default class JournalCard extends Component {

    render() {
        console.log("this.props.journals", this.props.journals)
        // console.log("this.props.journals.journals", this.props.journals.journals)
        // console.log("this.props.journals.journals[1].timestamp", this.props.journals.journals[1].timestamp)
        // (this.props.journals.journals !== []) ?
        // console.log(this.props.journals.journals[1].timestamp)
        // : null
        // debugger
        return (
            <div>
                <h4>{this.props.journals.prompt[1]}</h4>
                <div>
                    <p>{this.props.journals.entry}</p>
                    <p>{this.props.journals.timestamp}</p>
                    <p>{this.props.journals.id}</p>
                    <button
                        onClick={() => this.props.handleDelete(this.props.journals.id)}
                    >Delete</button>
                    <button
                        onClick={() => this.props.history.push(`/journal/entries/${this.props.journals.id}`)}
                    >Edit</button>
                </div>

            </div>
        )
    }
}