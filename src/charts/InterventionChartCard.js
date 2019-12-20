import React, { Component, useState, useEffect, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';


export default class InterventionChartCard extends Component {
    state = {
        data: {},
        labels: [],
        datasets: []
    }
    
    generateColor = () => {   
        // debugger
        const randomValue = Math.round(Math.random() * 255)
        return `rbg(${randomValue}, ${randomValue} , ${randomValue})`  
    }
    buildChartData = () => {
        let colors = ['rgba(50, 133, 168,1)', 'rgba(75,192,192,1)', 'rgba(179, 55, 168)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)']
        
        
        const timestamps = this.props.interventionData.map(item => {
             let date = item.t
             return new Date(date)

        })
        console.log(timestamps)

        
        const datasets =
            [
              {
                    label: this.props.interventionData[0].name,
                    backgroundColor: this.generateColor(),
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: this.props.interventionData
                }
            ]
        this.setState({
            datasets: datasets,
            data: datasets,
            labels: timestamps
        })
  
    }

    render() {
        console.log("PROPS", this.props.interventionData)
        return (
            <div
            onMouseOver={() => this.props !== [] ?
                this.buildChartData()
                : null}
            >
                       
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
