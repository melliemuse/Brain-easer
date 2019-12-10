import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import AnxietyRating from './AnxietyRating'

export default class ApplicationViews extends Component {

render() {
    return (
<>
<Route path="/" render={props => {
return <AnxietyRating {...props}
/>
}
}

/>
</>
    )
}
}