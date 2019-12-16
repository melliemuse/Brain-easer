import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import MainChart from './MainChart'
import { promised } from 'q'

export default class ChartList extends Component {
    state = {
        allData: [],
        userInterventions: [],
        interventions: [],
        baseAnxietyId: [],
        baseAnxietyTimestamp: [],
        baseAnxietyScore: [],
    }
    componentDidMount() {
        const currentUser = localStorage.getItem("activeUser")
        let allData = []

        Promise.all([
            APIManager.getAllInterventionsbyUser("baselineAnxietyScores", currentUser)
                .then((baseAnxiety) => {
                    const baseAnxietyId = baseAnxiety.map(anxiety => anxiety.id)
                    const baseAnxietyTimestamp = baseAnxiety.map(anxiety => anxiety.timestamp)
                    const baseAnxietyScore = baseAnxiety.map(anxiety => anxiety.anxietyScore)
                    this.setState({
                        baseAnxietyId: baseAnxietyId,
                        baseAnxietyTimestamp: baseAnxietyTimestamp,
                        baseAnxietyScore: baseAnxietyScore,
                    })
                }),
            APIManager.getAllUserInterventionsWithInterventions("userInterventions", currentUser)
                .then((interventions) => {
                    console.log(interventions)
                    this.setState({
                        interventions: interventions
                    })
                }),
                    console.log(this.state.interventions)
        ])
    }
render() {
    console.log("Chart List state base anxiety", this.state.baseAnxiety)
    console.log("Chart List state user interventions", this.state)
    return (
        <>
            <div className="card chart-card">
                <MainChart baseAnxietyId={this.state.baseAnxietyId} baseAnxietyTimestamp={this.state.baseAnxietyTimestamp} baseAnxietyScore={this.state.baseAnxietyScore} ratingData={[this.state.allData]} />

            </div>
        </>
    )
}

}