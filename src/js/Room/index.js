import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Board from './Board.js';
import ChampionShop from './ChampionShop.js';
import Hand from './Hand.js';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import { ENGINE_METHOD_NONE } from 'constants';


class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: '',
            board: {
                "00": null,
                "01": null,
                "02": null,
                "03": null,
                "04": null,
                '05': null,
                "10": null,
                "11": null,
                "12": null,
                "13": null,
                "14": null,
                "15": null,
                "20": null,
                "21": null,
                "22": null,
                "23": null,
                "24": null,
                "25": null
            },
            hand: {
                0: null,
                1: null,
                2: null,
                3: null,
                4: null,
                5: null,
                6: null,
                7: null
            }
            //TODO PHASE ~5: update deck, hand, etc 
        }
        this.resolveClick = this.resolveClick.bind(this);
    }
    purchaseChampion() {
        for (var i = 0; i < 8; i++) {
            if (this.state.hand[i] == null) {
                // set champion
                // this.hand[i] = champion;
                // remove from shop
                break;
            }
        }
    }

    resolveClick(type, val1=false) {
        if (type === "PurchaseChampion") {
            console.log("PURCHASED CHAMPION " + val1);
            this.purchaseChampion()
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
                    <Hand
                        resolveClick = {this.resolveClick}
                    />
                </div>
            )
        }
    }
}

export default Room;