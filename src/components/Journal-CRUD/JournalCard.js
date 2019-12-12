import React, {Component} from 'react'


export default class JournalCard extends Component {
    
render() {
    console.log(this.props)
    return (
        <>
        <h3>{this.props.entries.entry.prompt}</h3>
        <p>{this.props.entries.entry}</p>
        </>
    )
}
}