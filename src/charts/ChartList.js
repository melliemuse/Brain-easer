import React, {Component} from 'react'
import APIManager from '../modules/APIManager'
import MainChart from './MainChart'
import { promised } from 'q'

export default class ChartList extends Component {
    state = {
        baseAnxiety: [],
        userInterventions1: []
    }
    componentDidMount() {
        const currentUser = localStorage.getItem("activeUser")
        Promise.all([
            APIManager.getAllInterventionsbyUser("baselineAnxietyScores", currentUser)
            .then((baseAnxiety) => {
                // console.log(baseAnxiety)
                this.setState({
                    baseAnxiety: baseAnxiety
                })
            }),
                    APIManager.getUserInterventions("userInterventions", currentUser, 1)
                    .then(userInterventions => {
                        // console.log(userInterventions)
                        this.setState({
                            userInterventions1: userInterventions
                        })
            }),
                    APIManager.getUserInterventions("userInterventions", currentUser, 2)
                    .then(userInterventions => {
                        // console.log(userInterventions)
                        this.setState({
                            userInterventions2: userInterventions
                        })
            }),
                    APIManager.getUserInterventions("userInterventions", currentUser, 3)
                    .then(userInterventions => {
                        // console.log(userInterventions)
                        this.setState({
                            userInterventions3: userInterventions
                        })
            }),
                    APIManager.getUserInterventions("userInterventions", currentUser, 3)
                    .then(userInterventions => {
                        // console.log(userInterventions)
                        this.setState({
                            userInterventions3: userInterventions
                        })
            }),
                    APIManager.getUserInterventions("userInterventions", currentUser, 4)
                    .then(userInterventions => {
                        // console.log(userInterventions)
                        this.setState({
                            userInterventions4: userInterventions
                        })
            }),
                    APIManager.getUserInterventions("userInterventions", currentUser, 5)
                    .then(userInterventions => {
                        // console.log(userInterventions)
                        this.setState({
                            userInterventions5: userInterventions
                        })
            }),
                    APIManager.getUserInterventions("userInterventions", currentUser, 6)
                    .then(userInterventions => {
                        // console.log(userInterventions)
                        this.setState({
                            userInterventions6: userInterventions
                        })
            }),
                    APIManager.getUserInterventions("userInterventions", currentUser, 7)
                    .then(userInterventions => {
                        // console.log(userInterventions)
                        this.setState({
                            userInterventions7: userInterventions
                        })
            }),
                    APIManager.getUserInterventions("userInterventions", currentUser, 8)
                    .then(userInterventions => {
                        // console.log(userInterventions)
                        this.setState({
                            userInterventions8: userInterventions
                        })
            }),
                    APIManager.getUserInterventions("userInterventions", currentUser, 9)
                    .then(userInterventions => {
                        // console.log(userInterventions)
                        this.setState({
                            userInterventions9: userInterventions
                        })
            }),
                    APIManager.getUserInterventions("userInterventions", currentUser, 10)
                    .then(userInterventions => {
                        // console.log(userInterventions)
                        this.setState({
                            userInterventions10: userInterventions
                        })
            }),

        ])
    }
            render() {
                console.log("Chart List state base anxiety", this.state.baseAnxiety)
                console.log("Chart List state user interventions", this.state)
                return (
                    <>
                    <div className="card chart-card"> 
                    <MainChart baseAnxiety={this.state.baseAnxiety} userInterventions1={this.state.userInterventions1} userInterventions2={this.state.userInterventions2}
                    userInterventions3={this.state.userInterventions3} userInterventions4={this.state.userInterventions4} userInterventions5={this.state.userInterventions5}userInterventions6={this.state.userInterventions6} userInterventions7={this.state.userInterventions7} userInterventions8={this.state.userInterventions8}userInterventions9={this.state.userInterventions9} userInterventions10={this.state.userInterventions10}/>

                    </div>
                    </>
                )
            }

}