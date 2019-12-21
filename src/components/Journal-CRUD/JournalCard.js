import React, { Component } from 'react'
import Button from '@material-ui/core/Button';


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
            <>
                <div>
                <h4>{this.props.journals.prompt.prompt}</h4>
                    <p className="entryList">{this.props.journals.entry}</p>
                    <p>{new Date(this.props.journals.timestamp).toString()}</p>
                    <div>
                    <Button
                        onClick={() => this.props.handleDelete(this.props.journals.id)}
                    >Delete</Button>
                    <Button
                        onClick={() => this.props.history.push(`/journal/entries/${this.props.journals.id}`)}
                    >Edit</Button>
                    </div>
                </div>

            </>
        )
    }
}