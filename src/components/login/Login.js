import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'

export default class Login extends Component {
    state = {
        password: "",
        username: "",
        users: [],
        noSuchUser: false
    }

    componentDidMount() {
        APIManager.getAll("users")
        .then(users => {
            this.setState({
                users: users
            })
            console.log(this.state.users)
        })
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
        this.state.users.map(user =>
            {if (user.username === this.state.username && user.password === this.state.password) {
            APIManager.getUserBy("users", this.state.username, this.state.password)
                .then(user => {
                    {this.props.setUser(user[0].id)}
                })
                } else {
                    this.setState({noSuchUser: true})
                }
            } 
        )
        {if (this.state.noSuchUser === true) {
            window.alert("Please enter credentials for an existing account")
        }}
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
