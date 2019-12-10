import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'

export default class Login extends Component {
    state = {
        password: "",
        username: ""
    }

    componentDidMount() {
    }

    handleFieldChange = event => {
        event.preventDefault()
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
        console.log("state", this.state)
    }

submitForm = (event) => {
    event.preventDefault()
    console.log("submit form function executes")
    APIManager.getUserBy("users", this.state.username, this.state.password)
    .then(user => {
        this.props.setUser(user[0].id)
       
    })
}

    render() {
        console.log(this.props)
        return (
            <>
            <h2>Login</h2>
                <form onSubmit={this.submitForm}>
                    <fieldset>
                        <label>
                        Username
                        </label>
                        <input
                        id="username"
                        onChange={this.handleFieldChange}
                        />
                        <label>
                        Password
                        </label>
                        <input
                        id="password"
                        onChange={this.handleFieldChange}
                        />
                        <button type="submit">Login</button>
                    </fieldset>
                </form>
            </>
        )
    }
}
