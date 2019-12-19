import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import MainChart from './MainChart'

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
                    // console.log("state intervention map", this.state.interventionMap)
                    // console.log("state mega array", this.state.megaArray)
                })
            }).then(() => {
                // console.log("Mega Array", this.state.megaArray)
                // console.log("Mega Array index 0", this.state.megaArray[0])
                // console.log("Mega Array index 0, index 0", this.state.megaArray[0][0])
                // console.log("Mega Array index 0, index 0, anxiety score", this.state.megaArray[0][0].anxietyScore)

                // parse timestamp to back to date object in readable format
                const testDate = new Date("2019-12-14T03:02:33.876Z")
                console.log(testDate)

                // create a container array with nested empty arrays- one per array in megaArray
                const interventionData = []
                for (let i = 0; i < this.state.megaArray.length; i++) {
                    interventionData.push([])
                }

                //figuring out sort

                    const sortTest = this.state.baseAnxietyTimestamp.sort(function (a, b) {
                        // debugger
                        let d1 = new Date(a), d2 = new Date(b)
                        return d1 - d2
                    })
                      

                console.log("pre-sort", this.state.baseAnxietyTimestamp)
                console.log("sort", sortTest)
                console.log("reverse sort", sortTest.reverse())

                // sorting megaArray by timestamp

                // if (this.state.megaArray !== []) {
                //     for (let i = 0; i < this.state.megaArray.length; i++) {
                //         if (this.state.megaArray[i] !== undefined) {
                //             for (let j = 0; j < this.state.megaArray[i].length; j++) {
                //                 const intervention = this.state.megaArray[i][j]
                //                 const sortedMegaArray = this.state.megaArray.sort(function (a, b) {
                //                     return b[0].date.getTime() - a[0].date.getTime();
                //                 });

                //                 const dataObject =
                //                     { t: intervention.timestamp, y: intervention.anxietyScore }

                //                 interventionData[i].push(dataObject)
                //             }
                //         }
                //     }
                // }
                console.log("interventionData", interventionData)


                // console.log(sortedMegaArray)
                // const sortedInterventions = intervention.sort((a, b) => b.timestamp - a.timestamp)

                console.log(interventionData)
                console.log(this.state.megaArray.length)

                if (this.state.megaArray !== []) {
                    for (let i = 0; i < this.state.megaArray.length; i++) {
                        if (this.state.megaArray[i] !== undefined) {
                            for (let j = 0; j < this.state.megaArray[i].length; j++) {
                                const intervention = this.state.megaArray[i][j]


                                const dataObject =
                                    { t: intervention.timestamp, y: intervention.anxietyScore }

                                interventionData[i].push(dataObject)
                            }
                        }
                    }
                }
                console.log("interventionData", interventionData)


                // All timestamps in one array
                let timestamps = []
                const megaTimestamps = this.state.baseAnxietyTimestamp.sort(function (a, b) {
                    
                    let d1 = new Date(a), d2 = new Date(b)
                    return d1 - d2
                })
                const test = this.state.megaArray.map(object => {
                    if (object !== undefined) {
                        for (const element of object) {
                            timestamps.push(element.timestamp)
                        }
                    }
                }
                )
                
                console.log(timestamps)
               const megaTimestampSort = timestamps.sort(function (a, b) {
                    // debugger
                    let d1 = new Date(a), d2 = new Date(b)
                    return d1 - d2
                })
                console.log(megaTimestampSort)
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
