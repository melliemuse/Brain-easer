import React, { Component } from 'react'
import APIManager from '../modules/APIManager'
import InterventionRerate from './InterventionRerate'
import Button from '@material-ui/core/Button';

export default class InterventionDetails extends Component {
    state = {
        interventions: {},
        intervention: [],
        displayRerate: false,
        completedSelfCare: {},
        imageUrl: "",
    }

    componentDidMount() {
        APIManager.get("interventions", this.props.match.params.interventionId)
            .then(intervention => {
                this.setState({
                    intervention: intervention
                })
            })
    }

    handleClick = () => {
        const currentUser = localStorage.getItem("activeUser")
        const completedSelfCare = {
            userId: parseInt(currentUser),
            timestamp: new Date(),
            interventionId: this.state.intervention.id,
            description: "",
            anxietyScore: ""
        }
        APIManager.post("userInterventions", completedSelfCare)
            .then(intervention => APIManager.get("userInterventions", intervention.id)
                .then(interventions => {
                    this.setState({
                        interventions: interventions
                    })
                }))
            .then(this.setState({
                displayRerate: !this.state.displayRerate
            }))
    }

    // Uploading images to Cloudinary: https://cloudinary.com/blog/how_to_build_an_image_library_with_react_cloudinary#uploading_images

//I wrote this as a fat arrow function because I wanted to use this.state()
uploadWidget = () => {
    window.cloudinary.openUploadWidget({ cloud_name: "dwjgfd51f", upload_preset: "yt2dp2iy", tags:['atag']},
        (error, result) => {
            // See what cloudinary returns
            if (result) {
                console.log(result); 
                // Building the entire URL for the uploaded image using the data cloudinary returns
                console.log("https://res.cloudinary.com/dwjgfd51f/image/upload/v1577143497/" + result[0].public_id)
      
                // Just like other input forms, changing state so that the imageUrl property will contain the URL of the uploaded image
                this.setState({imageUrl: `https://res.cloudinary.com/dwjgfd51f/image/upload/v1577143497/${result[0].public_id}`})
            };
            })
  }

    render() {
        console.log(this.state.intervention)
        return (
            <>
                <article className="intervention-details main">
                    <h1>{this.state.intervention.name}</h1>
                    <div>
                        <p>{this.state.intervention.description}</p>
                    </div>
                    <div>
                        <h3>Instructions</h3>
                        <p>{this.state.intervention.instructions}</p>
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            this.props.history.push("/interventions")
                        }}> Back to Interventions
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            if (this.state.intervention.id === 7) {
                                this.props.history.push("/journal")
                            } else {
                                this.handleClick()
                            }
                        }}>Complete this intervention!
                        </Button>
                    {this.state.intervention.id === 6 &&
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={
                            this.uploadWidget}>Upload Image
                            </Button>}
                    {this.state.displayRerate &&
                        <InterventionRerate intervention={this.state.intervention}
                            interventions={[this.state.interventions]} {...this.props} />}
                </article>
            </>
        )
    }
}