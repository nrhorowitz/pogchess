import React from 'react';
import Typography from '@material-ui/core/Typography';
import Leaderboard from './Leaderboard.js';
import Background from './Background.js';
import Profile from './Profile.js';
import LandingAuthButton from './LandingAuthButton.js';
import PlayButton from './PlayButton.js';
import './card.css';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import '../../css/index.css';

class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: '',
            showLoginMenu: false,
        }
        this.resolveClick = this.resolveClick.bind(this);
    }

    resolveClick(type) {
        if (type === "SignIn") {
            this.setState({showLoginMenu: !this.state.showLoginMenu});
        } else if (type === "PlaySignedIn") {
            //TODO (VERY IMPORTANT TODO) remove from queue backend
            this.setState({redirect: '/matchfinder?id=IRRELEVANT_RANDOMIZED_GARBO'});
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
                <div className='landing-background'>
                    <Background active={true}></Background>
                    <div class="card">
                        <Typography variant="h2">AUTOCHESS.IO</Typography>
                        <Profile firebase={this.props.firebase}/>
                        <LandingAuthButton
                            firebase={this.props.firebase}
                            resolveClick={this.resolveClick}
                            showLoginMenu={this.state.showLoginMenu}
                            />
                        <PlayButton
                            firebase={this.props.firebase}
                            resolveClick={this.resolveClick}
                        />
                    </div>
                    <Leaderboard
                        playerMap = {playerMap}
                    />
                </div>
            )
        }
    }
}

export default Landing;