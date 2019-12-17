import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import MainChart from './MainChart'
import { promised } from 'q'

export default class ChartList extends Component {
    state = {
        userInterventions: [],
        interventions: [],
        interventionMap: [],
        megaArray: [],
        baseAnxietyId: [],
        baseAnxietyTimestamp: [],
        baseAnxietyScore: [],
    }
    componentDidMount() {
        const currentUser = localStorage.getItem("activeUser")
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
                console.log("base anxiety timestamp values", this.state.baseAnxietyTimestamp)
                console.log("base anxiety score values", this.state.baseAnxietyScore)
            })
        APIManager.getAllUserInterventionsWithInterventions("userInterventions", currentUser)
            .then((interventions) => {
                console.log("intervention data pre-map", interventions)
                const interventionMap = {}
                interventions.map(intervention => {
                    console.log(intervention)
                    const interventionType = intervention.interventionId
                    if (`${interventionType}` in interventionMap) {
                        // console.log("True", interventionType)
                        interventionMap[`${interventionType}`].push(intervention)
                    } else {
                        // console.log("False", interventionType)
                        interventionMap[interventionType] = [intervention]
                        console.log("intervention map", interventionMap)
                    }
                    let megaArray = []
                    for (let i = 0; i <= Object.keys(interventionMap).length; i++) {
                        megaArray.push(interventionMap[i + 1])
                    }
                    // console.log(megaArray)
                    this.setState({
                        interventionMap: interventionMap,
                        megaArray: megaArray
                    })
                    // console.log("state intervention map", this.state.interventionMap)
                    // console.log("state mega array", this.state.megaArray)
                })
                // const result = words.filter(word => word.length > 6);
            }).then(() => {
               
            })
    }
    render() {
        console.log("Chart List state base anxiety", this.state.baseAnxiety)
        console.log("Chart List state user interventions", this.state)
        return (
            <>
                <div className="card chart-card">
                    <MainChart baseAnxietyId={this.state.baseAnxietyId} baseAnxietyTimestamp={this.state.baseAnxietyTimestamp} baseAnxietyScore={this.state.baseAnxietyScore} interventionMap={this.state.interventionMap} megaArray={this.state.megaArray}/>
                </div>
            </>
        )
    }

}
