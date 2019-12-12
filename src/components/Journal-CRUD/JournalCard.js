import React, { Component } from 'react'


export default class JournalCard extends Component {

    render() {
        // console.log("this.props.journals", this.props.journals)
        // console.log("this.props.journals.journals", this.props.journals.journals)
        // console.log("this.props.journals.journals[1].timestamp", this.props.journals.journals[1].timestamp)
        // (this.props.journals.journals !== []) ?
        // console.log(this.props.journals.journals[1].timestamp)
        // : null
        // debugger
        return (
                <div>
                    <h4>{this.props.journals.prompt}</h4>
                    {this.props.journals.journals.map(journal =>
                        <div key={journal.id}>
                            <p>{journal.entry}</p>
                            <p>{journal.timestamp}</p>
                            <button>Delete</button>
                            <button>Edit</button>
                            </div>
                            )}
                </div>
        )
    }
}