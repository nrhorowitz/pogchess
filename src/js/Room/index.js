import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Board from './Board.js';
import ChampionShop from './ChampionShop.js';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";


class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: '',
            board: {
                
            },
            //TODO PHASE ~5: update deck, hand, etc 
        }
        this.resolveClick = this.resolveClick.bind(this);
    }

    resolveClick(type, val1=false) {
        if (type === "PurchaseChampion") {
            console.log("PURCHASED CHAMPION " + val1);
            //action
        } else if (type === "EndPlacementTurn") {
            console.log("END TURN");
        } else if (type === "Location") {
            console.log("CLICKED LOCATION " + val1);
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
                    <Typography variant="h1">{'Room Id: ' + this.props.roomId}</Typography>
                    <Button
                        onClick={()=>this.resolveClick("EndPlacementTurn")}
                        variant="contained"
                        color="secondary"
                    >END TURN</Button>
                    <Board
                        resolveClick = {this.resolveClick}
                    />
                    <Typography variant="h4">============</Typography>
                    <ChampionShop
                        resolveClick = {this.resolveClick}
                    />
                </div>
            )
        }
    }
}

export default Room;