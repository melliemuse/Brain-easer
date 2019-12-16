import React, { Component, useState, useEffect, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';


export default class MainChart extends Component {

    state = {
        data: {},
        labels: [],
        datasets: []
    }
    buildChartData = () => {
        let colors = ['rgba(50, 133, 168,1)', 'rgba(75,192,192,1)', 'rgba(179, 55, 168)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)']
        const datasets =
            [
                {
                    label: 'Base Anxiety',
                    backgroundColor: 'rgba(75,192,192,1)',
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
