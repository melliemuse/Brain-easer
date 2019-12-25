import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import MainChart from './MainChart'
import ScatterPlot from './ScatterPlot'
import InterventionChartCard from './InterventionChartCard'

export default class ChartList extends Component {
    state = {
        userInterventions: [],
        interventions: [],
        interventionMap: [],
        megaArray: [],
        baseAnxietyId: [],
        baseAnxietyTimestamp: [],
        baseAnxietyScore: [],
        interventionData: []
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
            })
        APIManager.getAllUserInterventionsWithInterventions("userInterventions", currentUser)
            .then((interventions) => {
                const interventionMap = {}
                interventions.map(intervention => {
                    const interventionType = intervention.interventionId
                    if (`${interventionType}` in interventionMap) {
                        interventionMap[`${interventionType}`].push(intervention)
                    } else {
                        interventionMap[interventionType] = [intervention]
                    }
                })
                console.log("INTERVENTION map", interventionMap)
                let megaArray = []
                Object.values(interventionMap).forEach(element => {
                    megaArray.push(element)
                });
                console.log("MEGA ARRAY", megaArray)


                this.setState({
                    interventionMap: interventionMap,
                    megaArray: megaArray
                })
            })
            .then(() => {

                // create a container array with nested empty arrays- one per array in megaArray
                const interventionData = []
                for (let i = 0; i < this.state.megaArray.length; i++) {
                    interventionData.push([])
                }

                
                if (this.state.megaArray !== []) {
                    for (let i = 0; i < this.state.megaArray.length; i++) {
                        if (this.state.megaArray[i] !== undefined) {
                            for (let j = 0; j < this.state.megaArray[i].length; j++) {
                                const intervention = this.state.megaArray[i][j]
                                const interventionName = this.state.megaArray[i][j].intervention.name
                                console.log("MEGA ARRAY ITERATION", this.state.megaArray[i][j])
                                console.log("MEGA ARRAY ITERATION .name",this.state.megaArray[i][j].name)
                                const dataObject =
                                    { t: intervention.timestamp, y: intervention.anxietyScore, name: interventionName }
                                interventionData[i].push(dataObject)
                            }

                        }
                    }
                }
                console.log("interventionData", interventionData)
                this.setState({
                    interventionData: interventionData
                })

            })
    }
    render() {


        return (
            <>

                <div className="card chart-card">
                    <MainChart baseAnxietyId={this.state.baseAnxietyId} baseAnxietyTimestamp={this.state.baseAnxietyTimestamp} baseAnxietyScore={this.state.baseAnxietyScore} interventionMap={this.state.interventionMap} megaArray={this.state.megaArray} />
                </div>

                <div className="card chart-card">
                    {this.state.interventionData !== [] && 
                    this.state.interventionData.map((miniArray, i) =>
                        // console.log("HELLO", miniArray)
                        <InterventionChartCard
                            position={i}
                            // id={miniArray[0].interventionId}
                            key={i}
                            interventionData={miniArray}
                        />
                    )}
                </div>
                {/* <div className="card chart-card">
                    {this.state.interventionData !== [] && 
                    this.state.interventionData.map((miniArray, i) =>
                        // console.log("HELLO", miniArray)
                        <ScatterPlot
                            position={i}
                            // id={miniArray[0].interventionId}
                            key={i}
                            interventionData={miniArray}
                        />
                    )}
                </div> */}

            </>
        )
    }

}
