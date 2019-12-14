import React, {Component} from 'react'
import APIManager from '../modules/APIManager'

export default class ChartList extends Component {
    state = {
        baseAnxiety: [],
        userIntervention: []
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
                    <h1>TEST</h1>
                    </>
                )
            }

}