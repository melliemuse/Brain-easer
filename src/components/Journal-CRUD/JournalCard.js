import React, {Component} from 'react'


export default class JournalCard extends Component {
    
render() {
    console.log(this.props)
    return (
        <>
        <h3>{this.props.journals.prompt}</h3>
        {/* {this.props.journals.journal.map(entry)
        <p>{}</p> */}
        <button>Delete</button>
        <button>Edit</button> 
        </>
    )
}
}