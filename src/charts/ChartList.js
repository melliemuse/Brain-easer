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
        intervention1Data: []
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
                // console.log("base anxiety timestamp values", this.state.baseAnxietyTimestamp)
                // console.log("base anxiety score values", this.state.baseAnxietyScore)
            })
        APIManager.getAllUserInterventionsWithInterventions("userInterventions", currentUser)
            .then((interventions) => {
                // console.log("intervention data pre-map", interventions)
                const interventionMap = {}
                interventions.map(intervention => {
                    // console.log(intervention)
                    const interventionType = intervention.interventionId
                    if (`${interventionType}` in interventionMap) {
                        // console.log("True", interventionType)
                        interventionMap[`${interventionType}`].push(intervention)
                    } else {
                        // console.log("False", interventionType)
                        interventionMap[interventionType] = [intervention]
                        // console.log("intervention map", interventionMap)
                    }
                    let megaArray = []
                    for (let i = 0; i <= Object.keys(interventionMap).length; i++) {
                        megaArray.push(interventionMap[i + 1])
                    }

                    this.setState({
                        interventionMap: interventionMap,
                        megaArray: megaArray
                    })
                })
                // const result = words.filter(word => word.length > 6);
            }).then(() => {
                console.log("Mega Array", this.state.megaArray)
                // console.log("Mega Array index 0", this.state.megaArray[0])
                // console.log("Mega Array index 0, index 0", this.state.megaArray[0][0])
                // console.log("Mega Array index 0, index 0, anxiety score", this.state.megaArray[0][0].anxietyScore)

                
                const interventionData = [[], [], [], [], [], [], [], [], [], []]
                
                if (this.state.megaArray !== []) {
                    for (let i = 0; i < this.state.megaArray.length; i++) {
                        if (this.state.megaArray[i] !== undefined) {
                            for (let j = 0; j < this.state.megaArray[i].length; j++) {
                                // debugger
                                const intervention = this.state.megaArray[i][j]
                                
                                const dataObject =
                                    { t: intervention.timestamp, y: intervention.anxietyScore }
                            
                                interventionData[i].push(dataObject)
                                // this.state.megaArray[i].forEach(element => {
                                //     console.log("element", element)
                                // });
                                // this.state.megaArray[i].map((intervention) => {

                                // //     const dataObject = [
                                // //         { t: intervention.timestamp, y: intervention.anxietyScore }
                                // // ]
                                // //     interventionData.push(dataObject)
                                // //     return dataObject
                                // })
                            }
                        }
                    }
                }
                console.log("interventionData", interventionData)
                // this.setState({ intervention1Data: interventionData })
                // console.log("intervention data state", this.state.intervention1Data)
            })
    }
    render() {
        // console.log("Chart List state base anxiety", this.state.baseAnxiety)
        // console.log("Chart List state user interventions", this.state)
        return (
            <>
                <div className="card chart-card">
                    <MainChart baseAnxietyId={this.state.baseAnxietyId} baseAnxietyTimestamp={this.state.baseAnxietyTimestamp} baseAnxietyScore={this.state.baseAnxietyScore} interventionMap={this.state.interventionMap} megaArray={this.state.megaArray} />
                </div>
            </>
        )
    }

}
