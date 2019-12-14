import React, {Component} from 'react'
import APIManager from '../modules/APIManager'
import MainChart from './MainChart'

export default class ChartList extends Component {
    state = {
        baseAnxiety: [],
        userInterventions: []
    }
    componentDidMount() {
        const currentUser = localStorage.getItem("activeUser")
        APIManager.getAllInterventionsbyUser("baselineAnxietyScores", currentUser)
        .then((baseAnxiety) => {
            console.log(baseAnxiety)
            this.setState({
                baseAnxiety: baseAnxiety
            })
        })
            .then(() => {
                APIManager.getAllInterventionsbyUser("userInterventions", currentUser)
                .then(userInterventions => {
                    this.setState({
                        userInterventions: userInterventions
                    })
                
            })
        })
    }
            render() {
                return (
                    <>
                    <h1>My Progress</h1>
                    <div class="card chart-card">
                    {this.state.userInterventions.map(userIntervention =>
                    <MainChart userIntervention={userIntervention}/>
                    )}
                    {this.state.baseAnxiety.map(baseAnxiety =>
                    <MainChart userIntervention={baseAnxiety}/>
                    )}
                    </div>
                    </>
                )
            }

}