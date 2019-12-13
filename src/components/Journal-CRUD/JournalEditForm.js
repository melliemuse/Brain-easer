import React, {Component} from 'react'
import APIManager from '../../modules/APIManager'

export default class JournalEditForm extends Component {
    state = {
        journal: []
    }
componentDidMount() {
    APIManager.get("journals", this.props.match.params)
    .then(journal => {
        this.setState({
            journal: journal
        })
    })
}

render() {
    return (
        <>
        </>
    )
}
}