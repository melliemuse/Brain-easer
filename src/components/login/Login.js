import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'

export default class Login extends Component {
    state = {
        password: "",
        username: "",
        users: "",
        user: {}
    }

    componentDidMount() {
    }

    handleFieldChange = event => {
        event.preventDefault()
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

sumbitForm = (event) => {
    console.log("submit form function executes")
    APIManager.getBy("users", "password=this.state.password", "username=this.state.username")
    .then(user => {
        this.setState({
            user: user
        })
        localStorage.setItem("activeUser", this.state.user.id)
    })
}

    render() {
        return (
            <>
            <h2>Login</h2>
                <form onSubmit={this.sumbitForm}>
                    <fieldset>
                        <label>
                        Username
                        </label>
                        <input
                        id="username"
                        onClick={this.handleFieldChange}
                        />
                        <label>
                        Password
                        </label>
                        <input
                        id="password"
                        onClick={this.handleFieldChange}
                        />
                        <button type="submit">Login</button>
                    </fieldset>
                </form>
            </>
        )
    }
}
