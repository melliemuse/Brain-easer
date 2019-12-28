import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';


export default class ScatterPlot extends Component {
    state = {
        data: {},
        labels: [],
        datasets: []
    }
    generateColor() {
        const components = '0123456789ABCDEF'.split('');
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += components[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    buildChartData = () => {
        let toSortBaseline = this.props.baselineData.slice().sort()
        let toSortInt = this.props.interventionData.slice().sort()
        let simplifiedDates = []
        let simplifiedDatesInt = []
        let simplifiedObj = {}
        let simplifiedObjInt = {}
        let simplifiedArrayBaseline = []
        let simplifiedArrayInt = []
        console.log(toSortBaseline)
        console.log("simplifiedArrayInt", simplifiedArrayInt)
        for (let i = 0; i < toSortBaseline.length; i++) {
            let simplifiedDate = toSortBaseline[i].x.split("T")[0]
            let score = toSortBaseline[i].y
            simplifiedDates.push(simplifiedDate)
            console.log(score)
            simplifiedObj = {
                x: simplifiedDate,
                y: score
            }
            simplifiedArrayBaseline.push(simplifiedObj)
        }
        for (let i = 0; i < toSortInt.length; i++) {
            let simplifiedDateInt = toSortInt[i].x.split("T")[0]
            let score = toSortInt[i].y
            simplifiedDatesInt.push(simplifiedDateInt)
            simplifiedObjInt = {
                x: simplifiedDateInt,
                y: score
            }
            simplifiedArrayInt.push(simplifiedObjInt)
        }

        let sortedData = []
        const test2 = new Set(simplifiedDates);
        const testArray2 = [...test2];
        for (let i = 0; i < testArray2.length; i++) {
            let data = simplifiedArrayBaseline.find(array => array.x === testArray2[i])
            sortedData.push(data)
        }
        let sortedIntData = []
        const intSet = new Set(simplifiedDatesInt);
        const intArray = [...intSet];
        for (let i = 0; i < intArray.length; i++) {
            let data = simplifiedArrayInt.find(array => array.x === intArray[i])
            sortedIntData.push(data)
        }
        console.log("sortedData", sortedData)
        console.log("sorted Int Data", sortedIntData)
        let finalBaselineArray = []
        let finalBaselineDates = []
        for (let i = 0; i < intArray.length; i++) {
            let data = sortedData.find(array => array.x === intArray[i])
            finalBaselineArray.push(data)
            if (data !== undefined) {
                finalBaselineDates.push(data.x)
            }
        }
            console.log("Final Baseline Array", finalBaselineArray)
            console.log("Final Baseline Dates", finalBaselineDates)
        // 

        // let colors = ['rgba(50, 133, 168,1)', 'rgba(75,192,192,1)', 'rgba(179, 55, 168)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)', 'rgba(224, 47, 80)']



        const datasets =
            [
                {
                    label: this.props.interventionData[0].name,
                    backgroundColor: this.generateColor(),
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: sortedIntData
                },
                {
                    label: 'Base Anxiety',
                    backgroundColor: 'rgba(179, 55, 168)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: finalBaselineArray
                }
            ]
        this.setState({
            datasets: datasets,
            data: datasets,
            labels: finalBaselineDates
        })

    }

    render() {
        return (
            <div
                onMouseOver={() => this.props !== [] ?
                    this.buildChartData()
                    : null}
            >

                <Line
                    data={this.state}
                    options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        title: {
                            display: true,
                            text: this.props.interventionData[0].name,
                            fontSize: 20,
                            scales: {
                                yAxes: [{
                                    stacked: true,
                                    ticks: {
                                        source: 'data'
                                    },
                                }],
                                xAxes: [{
                                    stacked: true,
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
