import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Leaderboard from './Leaderboard.js';
import Background from './Background.js';
import './card.css';
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
            
        } else if (type === "Logout") {
            this.props.firebase.auth().signOut().then(() => {
                console.log("SIGNEDOUT");
                console.log(this.props.firebase.auth().currentUser);
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    renderAuthButtons() {
        if (this.props.firebase.auth().currentUser) {
            return (
                <div>
                    <Button variant="contained" color="secondary" onClick={()=>this.resolveClick("Logout")}>LOGOUT</Button>
                </div>
            )
        } else {
            return (
                <div>
                    <Button variant="contained" color="secondary" onClick={()=>this.resolveClick("Login")}>SIGN IN</Button>
                </div>
            )
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
                    <Background active={true}></Background>
                    <div class="card">
                        <Typography variant="h2">AUTOCHESS</Typography>
                        {this.renderAuthButtons()}
                        <Button variant="contained" color="secondary" onClick={()=>this.resolveClick("PlayAsGuest")}>PLAY AS GUEST</Button>
                    </div>
                    <Leaderboard
                        playerMap = {null}
                    ></Leaderboard>
                </div>
            )
        }
    }
}

export default Landing;