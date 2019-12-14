import React, { Component, useState, useEffect, useCallback } from 'react';
import {Bar} from 'react-chartjs-2';
import {Chart} from 'react-chartjs-2';

let moment = require('moment');
moment().format();



// Chart.plugins.register({
//     // plugin implementation
//     plugins: [{
//         beforeInit: function(chart) {
//            let time = chart.options.scales.xAxes.time // 'time' object reference
//               // difference (in days) between min and max date
//             //   timeDiff = moment(time.max).diff(moment(time.min), 'd');
//            // populate 'labels' array
//            // (create a date string for each date between min and max, inclusive)
//            for (let i = 0; i <= time; i++) {
//               let _label = moment(time).add(i, 'd').format('YYYY-MM-DD HH:mm:ss');
//               chart.data.labels.push(_label);
//            }
//         }
//      }]
// });



export default class AnxietyCharts extends Component {

    state = {
        labels: [],
        datasets: [
          {
            label: 'Base Anxiety',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [{t: "Sat, Dec 14, 2019, 12 AM", y: 4}, {t: "2013-02-07", y: 6}, {t: "1927-03-027", y: 10}, {t: "2047-02-04",y: 1}, {t: "2050-12-04", y: 8}]
          }
        ]
      }
    
    componentDidMount() {
        console.log(this.state.datasets[0].data)
        console.log(this.state.datasets[0].data.t)
        let time = []
        this.state.datasets[0].data.forEach(element => {
            moment(element).format("dddd, MMMM Do YYYY, h:mm:ss a")
            time.push(element.t)
        })
                this.setState({
                    labels: time
            })
    }
    
    render() {
        console.log(this.state)
    return (
      <div>
        <canvas id="myChart" width="400" height="400"></canvas>
        <Bar
          data={this.state}
          options={{
            title:{
              display:true,
              text:'Base Anxiety',
              fontSize:20, 
              scales: {
                xAxes: [{
                parser: true,
                distribution: 'series',
                bounds: 'ticks',
                ticks: {
                    source: 'data'},
                 type: 'time',
                 time: {
                    unit: 'day'
                }
              }]}
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
          
        />
      </div>
    );
  }
}
