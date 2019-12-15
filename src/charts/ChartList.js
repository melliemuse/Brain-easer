import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import MainChart from './MainChart'
import { promised } from 'q'

export default class ChartList extends Component {
    state = {
        allData: [],
        userInterventions: [],
        interventions: [],
        baseAnxiety: []
    }
    componentDidMount() {
        const currentUser = localStorage.getItem("activeUser")
        let allData = []
        Promise.all([
            APIManager.getAllInterventionsbyUser("baselineAnxietyScores", currentUser)
                .then((baseAnxiety) => {
                    allData.push(baseAnxiety)
                    this.setState({
                        baseAnxiety: baseAnxiety
                    })
                }),
            APIManager.getAllInterventionsbyUser("interventions", currentUser)
                .then((interventions) => {
                    console.log(interventions)
                    this.setState({
                        interventions: interventions
                    })
                        for (let i = 1; i < this.state.interventions.length; i++) {
                            APIManager.getUserInterventionsWithInterventions("userInterventions", currentUser, i)
                                .then(userInterventions => {
                                    allData.push(userInterventions)
                                })
                                }
                                this.setState({
                                    allData: allData
                                })
                }),
                    console.log(this.state.allData)
        ])
    }
render() {
    console.log("Chart List state base anxiety", this.state.baseAnxiety)
    console.log("Chart List state user interventions", this.state)
    return (
        <>
            <div className="card chart-card">
                <MainChart ratingData={[this.state.allData]} />

            </div>
        </>
    )
}

}