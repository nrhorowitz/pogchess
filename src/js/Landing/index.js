import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Leaderboard from './Leaderboard.js';
import Background from './Background.js';
import LoginMenu from './LoginMenu.js';
import './card.css';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";


class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: '',
            showLoginMenu: false,
        }
        this.resolveClick = this.resolveClick.bind(this);
        this.renderLoginMenu = this.renderLoginMenu.bind(this);
        this.renderAuthButtons = this.renderAuthButtons.bind(this);
    }

    resolveClick(type) {
        if (type === "Login") {
            if (true) { //TODO: check token
                this.setState({redirect: '/login'});
            }
        } else if (type === "SignIn") {
            this.setState({showLoginMenu: !this.state.showLoginMenu});
        } else if (type === "Logout") {
            this.props.firebase.auth().signOut().then(() => {
                console.log("SIGNEDOUT");
                console.log(this.props.firebase.auth().currentUser);
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    renderLoginMenu() {
        if (this.state.showLoginMenu) {
            return (
                <LoginMenu
                    firebase = {this.props.firebase}
                ></LoginMenu>
            )
        } else {
            return (
                <div></div>
            )
        }
    }

    renderAuthButtons() {
        if (this.props.firebase.auth().currentUser) {
            return (
                <div class="button-wrapper">
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={()=>this.resolveClick("Logout")}
                        size='large'
                        fullWidth
                    >LOGOUT</Button>
                </div>
            )
        } else {
            return (
                <div class="button-wrapper">
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={()=>this.resolveClick("SignIn")}
                        size='large'
                        fullWidth
                    >SIGN IN</Button>
                    {this.renderLoginMenu()}
                </div>
            )
        }
    }

    render() {
        var playerMap = [ //TODO: top 10 players from database
            {name: 'Mr.Pog', lp: 1000, imageUrl: 'https://firebasestorage.googleapis.com/v0/b/pogchess.appspot.com/o/profile-icon%2FAVATAR_2_raw.png?alt=media&token=648c83ce-c0d7-4817-a17a-fae2b040025a'},
            {name: 'Mr.Pog', lp: 900, imageUrl: 'https://firebasestorage.googleapis.com/v0/b/pogchess.appspot.com/o/profile-icon%2FAVATAR_2_raw.png?alt=media&token=648c83ce-c0d7-4817-a17a-fae2b040025a'},
            {name: 'Mr.Pog', lp: 800, imageUrl: 'https://firebasestorage.googleapis.com/v0/b/pogchess.appspot.com/o/profile-icon%2FAVATAR_2_raw.png?alt=media&token=648c83ce-c0d7-4817-a17a-fae2b040025a'},
            {name: 'Mr.Pog', lp: 700, imageUrl: 'https://firebasestorage.googleapis.com/v0/b/pogchess.appspot.com/o/profile-icon%2FAVATAR_2_raw.png?alt=media&token=648c83ce-c0d7-4817-a17a-fae2b040025a'},
            {name: 'Mr.Pog', lp: 600, imageUrl: 'https://firebasestorage.googleapis.com/v0/b/pogchess.appspot.com/o/profile-icon%2FAVATAR_2_raw.png?alt=media&token=648c83ce-c0d7-4817-a17a-fae2b040025a'},
            {name: 'Mr.Pog', lp: 500, imageUrl: 'https://firebasestorage.googleapis.com/v0/b/pogchess.appspot.com/o/profile-icon%2FAVATAR_2_raw.png?alt=media&token=648c83ce-c0d7-4817-a17a-fae2b040025a'},
            {name: 'Mr.Pog', lp: 400, imageUrl: 'https://firebasestorage.googleapis.com/v0/b/pogchess.appspot.com/o/profile-icon%2FAVATAR_2_raw.png?alt=media&token=648c83ce-c0d7-4817-a17a-fae2b040025a'},
            {name: 'Mr.Pog', lp: 300, imageUrl: 'https://firebasestorage.googleapis.com/v0/b/pogchess.appspot.com/o/profile-icon%2FAVATAR_2_raw.png?alt=media&token=648c83ce-c0d7-4817-a17a-fae2b040025a'},
            {name: 'Mr.Pog', lp: 200, imageUrl: 'https://firebasestorage.googleapis.com/v0/b/pogchess.appspot.com/o/profile-icon%2FAVATAR_2_raw.png?alt=media&token=648c83ce-c0d7-4817-a17a-fae2b040025a'},
            {name: 'Mr.Pog', lp: 100, imageUrl: 'https://firebasestorage.googleapis.com/v0/b/pogchess.appspot.com/o/profile-icon%2FAVATAR_2_raw.png?alt=media&token=648c83ce-c0d7-4817-a17a-fae2b040025a'},
        ];
        if (this.state.redirect !== '') {
            return (
                <Redirect push to={this.state.redirect}></Redirect>
            )
        } else {
            return (
                <div>
                    <Background active={true}></Background>
                    <div class="card">
                        <Typography variant="h2">AUTOCHESS.IO</Typography>
                        {this.renderAuthButtons()}
                        <div class="button-wrapper">
                            <Button 
                                variant="contained" 
                                color="secondary" 
                                onClick={()=>this.resolveClick("PlayAsGuest")}
                                size='large'
                                fullWidth
                            >PLAY AS GUEST</Button>
                        </div>
                    </div>
                    <Leaderboard
                        playerMap = {playerMap}
                    ></Leaderboard>
                </div>
            )
        }
    }
}

export default Landing;