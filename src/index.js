import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import './index.css';
import Braineaser from './Braineaser';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';


const theme = createMuiTheme({
    palette: {
        common: {
            black: "#000", white: "#fff"
        },
        primary: {
            light: "rgba(108, 89, 244, 1)",
            main: "rgba(227, 154, 18 , 1)",
            dark: "rgba(216, 32, 228, 1)",
            contrastText: "#fff"
        },
        secondary: {
            light: "rgba(89, 244, 230, 1)",
            main: "rgba(51, 206, 255, 1)",
            dark: "rgba(51, 255, 240, 1)",
            contrastText: "rgba(255, 255, 255, 1)"
        },
        error: {
            light: "#e57373",
            main: "rgba(235, 28, 33, 1)",
            dark: "#d32f2f",
            contrastText: "#fff"
        },
        text: {
            primary: "rgba(0, 0, 0, 0.87)",
            secondary: "rgba(0, 0, 0, 0.54)",
            disabled: "rgba(0, 0, 0, 0.38)",
            hint: "rgba(0, 0, 0, 0.38)"
        }
    },
});


ReactDOM.render(
    <MuiThemeProvider theme = { theme }>
        <Router>
<Braineaser />
    </Router>
        </MuiThemeProvider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
