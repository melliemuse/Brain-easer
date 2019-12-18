import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import MainChart from './MainChart'

export default class ChartList extends Component {
    state = {
        allData: [],
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
                // console.log("base anxiety timestamp values", this.state.baseAnxietyTimestamp)
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
                    megaArray.push(interventionMap[i+1])
                }
                console.log(megaArray)
                    this.setState({
                        interventionMap: interventionMap,
                        megaArray: megaArray
                    })
                    console.log("state intervention map", this.state.interventionMap)
                    console.log("state mega array", this.state.megaArray)
                })
                // const result = words.filter(word => word.length > 6);
            }).then(() => {
                    let timestamps = []
                    const test = this.state.megaArray.map(object => {
                        // debugger
                        if (object !== undefined ) {
                            for (const element of object) {
                                 timestamps.push(element.timestamp)
                            }
                        }
                    }
                    ) 
                    console.log(timestamps)
                

                // console.log("chgvjk", this.state.interventionMap[i+1])
                // let timestamps = []
                // let anxietyScores = []
                // this.state.interventionMap[1].map((object) => {
                //     console.log("Mapppppppp", object)
                //     timestamps.push(object.timestamp)
                //     anxietyScores.push(object.anxietyScore)
                // })
                // console.log(timestamps)
                // console.log(anxietyScores)
                
                
            })
        }
        render() {
        console.log("Chart List state base anxiety", this.state.baseAnxiety)
        console.log("Chart List state user interventions", this.state)
        return (
            <>
                <div className="card chart-card">
                    <MainChart baseAnxietyId={this.state.baseAnxietyId} baseAnxietyTimestamp={this.state.baseAnxietyTimestamp} baseAnxietyScore={this.state.baseAnxietyScore} ratingData={[this.state.allData]} interventionMap={this.state.interventionMap} />
                </div>
            </>
        )
    }

}