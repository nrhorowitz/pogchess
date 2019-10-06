import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Leaderboard from './Leaderboard.js';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";


class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: '',
        }
        this.resolveClick = this.resolveClick.bind(this);
    }

    resolveClick(type) {
        if (type === "Login") {
            if (true) { //TODO: check token
                this.setState({redirect: '/login'});
            }
        } else if (type === "SignUp") {
            
        }
    }

    render() {
        if (this.state.redirect !== '') {
            return (
                <Redirect push to={this.state.redirect}></Redirect>
            )
        } else {
            return (
                <div>
                    <Typography variant="h1">LANDING</Typography>
                    <Button variant="contained" color="secondary" onClick={()=>this.resolveClick("Login")}>LOGIN</Button>
                    <Button variant="contained" color="secondary" onClick={()=>this.resolveClick("SignUp")}>SIGNUP</Button>
                    <Button variant="contained" color="secondary" onClick={()=>this.resolveClick("PlayAsGuest")}>PLAY AS GUEST</Button>
                    <Leaderboard></Leaderboard>
                </div>
            )
        }
    }
}

export default Landing;