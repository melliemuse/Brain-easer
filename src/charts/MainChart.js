import React, { Component, useState, useEffect, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';

let moment = require('moment');
moment().format();


export default class MainChart extends Component {

    state = {
        labels: [],
        // datasets: [
        //     {
        //       label: "Africa",
        //       backgroundColor: "#3e95cd",
        //       data: [133,221,783,2478]
        //     }, {
        //       label: "Europe",
        //       backgroundColor: "#8e5ea2",
        //       data: [408,547,675,734]
        //     }
        //   ]
        datasets: [
              {
                label: 'Base Anxiety',
                backgroundColor: 'rgba(50, 133, 168,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [4, 6, 10, 1, 8]
              },
              {
                label: 'Meditation',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [{t: "Sat, Dec 14, 2019, 12 AM", y: 4}, {t: "2013-02-07", y: 6}, {t: "1927-03-027", y: 10}, {t: "2047-02-04",y: 1}, {t: "2050-12-04", y: 8}]
              }

        ]
    }
    componentDidMount() {
        console.log("component did mount")
        console.log(this.props.ratingData[0])
    }

    buildChartData = () => {
        // console.log(this.props.ratingData)
        // console.log(this.props.ratingData[0])
        let colors = ['rgba(50, 133, 168,1)', 'rgba(75,192,192,1)', 'rgba(179, 55, 168)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)']
        let label = []
        let backgroundColor = []
        let borderColor = []
        let borderWidth = []
        let data = []
        let time = []

        // this.props.ratingData.forEach(interventionData =>
        //     // console.log(interventionData)
        //     interventionData.forEach(entries =>
        //     entries.forEach(eachEntry =>
        //     data.push({t: eachEntry.timestamp, y: eachEntry.anxietyScore}),
        //         console.log(data)
        //     )
        //     )
        // )
                {const datasets = {
                label: '',
                backgroundColor: '',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: data
            }
            // this.setState({
            //     datasets: datasets
            // })

            }
        // )

        // label: 'Base Anxiety',
        //     backgroundColor: 'rgba(50, 133, 168,1)',
        //     borderColor: 'rgba(0,0,0,1)',
        //     borderWidth: 2,
        //     data: [{t: "Sat, Dec 14, 2019, 12 AM", y: 4}, {t: "2013-02-07", y: 6}, {t: "1927-03-027", y: 10}, {t: "2047-02-04",y: 1}, {t: "2050-12-04", y: 8}]
        this.state.datasets.forEach(dataset => {
            time.push(dataset.t)

        })
        const labels = {}
            //     this.setState({
            //         labels: time
            // })
        // } 
        // else {
        //     return null 
        // }
        // }
    }

    render() {
        // console.log(this.state)
        console.log("Main chart props render return", this.props)
        return (
            <div>
                {this.props.ratingData !== [] ?
            this.buildChartData()
            : null}
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
                                xAxes: [{
                                    parser: true,
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
