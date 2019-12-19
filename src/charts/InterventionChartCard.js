import React, { Component, useState, useEffect, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';


export default class InterventionChartCard extends Component {
    state = {
        data: {},
        labels: [],
        datasets: []
    }
    buildChartData = () => {
        
                // Trying to get all anxiety scores and maybe timestamps into their own arrays by intervention type
                const mainAnxietyArray = []
                for (let i = 0; i <= this.props.megaArray.length; i++) {
                    // debugger
                    const eachScoreArray = []
                    this.props.megaArray.forEach(eachArray => {
                        console.log("each array", eachArray)
                        if (eachArray) {
                            eachArray.forEach(entry => {
                                eachScoreArray.push(entry.anxietyScore)
                                console.log("each score array", eachScoreArray)

                            })
                        }
                    })
                    mainAnxietyArray.push(eachScoreArray)
                    console.log(mainAnxietyArray)

                }


        let colors = ['rgba(50, 133, 168,1)', 'rgba(75,192,192,1)', 'rgba(179, 55, 168)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)']
        const datasets =
            [
              {
                    label: this.props.megaArray[0][0].intervention.name,
                    backgroundColor: 'rgba(224, 47, 80)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: [{ t: "1800-12-10T17:26:42.169Z", y: 4 }, { t: "2019-12-10T17:26:42.169Z", y: 6 }, { t: "1927-03-027", y: 10 }, { t: "2047-02-04", y: 1 }, { t: "2050-12-04", y: 8 }]
                },
                {
                    label: 'Test',
                    backgroundColor: 'rgba(224, 47, 80)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: [{ t: "1800-12-10T18:26:42.169Z", y: 4 }]
                },
                {
                    label: 'Meditation',
                    backgroundColor: 'rgba(224, 47, 80)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: this.props.baseAnxietyScore
                },
                {
                    label: 'Meditation',
                    backgroundColor: 'rgba(224, 47, 80)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: this.props.baseAnxietyScore
                }
            ]
        this.setState({
            datasets: datasets,
            data: datasets,
            labels: this.props.baseAnxietyTimestamp
        })
  
    }

    render() {
        return (
            <div>
                       
                <button onClick={() => this.props !== [] ?
                    this.buildChartData()
                    : null}>View Baseline Scores</button>
                <button onClick={() => this.props !== [] ?
                    this.buildChartData()
                    : null}>View Deep Breathing Scores</button>
                <Bar
                    data={this.state}
                    options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        title: {
                            display: true,
                            text: 'Anxiety Tracker',
                            fontSize: 20,
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        source: 'data'
                                    },
                                }],
                                xAxes: [{
                                    parser: "HH:mm",
                                    distribution: 'series',
                                    bounds: 'ticks',
                                    ticks: {
                                        source: 'data'
                                    },
                                    type: 'time',
                                    time: {
                                        unit: 'day'
                                    }
                                }]
                            }
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}

                />
            </div>
        );
    }
}
