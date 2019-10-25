import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Board from './Board.js';
import ChampionShop from './ChampionShop.js';
import Hand from './Hand.js';
import Reroll from './Reroll.js';
import Exp from './Exp.js'
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import { ENGINE_METHOD_NONE } from 'constants';


class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: '',
            board: {
                0: null,
                1: null,
                2: null,
                3: null,
                4: null,
                5: null,
                6: null,
                7: null,
                8: null,
                9: null,
                10: null,
                11: null,
                12: null,
                13: null,
                14: null,
                15: null,
                16: null,
                17: null
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
            },
            totalPool: [],
            playerPool: [],
            currentSelection: null,
            previousLocation: null,
            previousIndex: null,
            //DUMMY CODE - NEED TO PULL THIS DATA FROM DATABASE
            startingBoard: {
                0: null,
                1: null,
                2: null,
                3: null,
                4: null,
                5: null,
                6: null,
                7: null,
                8: null,
                9: null,
                10: null,
                11: null,
                12: null,
                13: null,
                14: null,
                15: null,
                16: null,
                17: null
            },
            playerGold: 100,
            playerEXP: 0,
            playerLevel: 1,
            totalChampionSlots: 3,
            placedChampions: 0
            //END DUMMY CODE
        }
        // Initialize stuff
        this.state.board = this.state.startingBoard;
        for (var i = 0; i < 15; i++) {
            this.state.totalPool.push(["Garen", 1]);
            this.state.totalPool.push(["Darius", 1]);
        }
        while (this.state.playerPool.length < 5) {
            var length = this.state.totalPool.length;
            var index = Math.floor(Math.random() * Math.floor(length));
            var character = this.state.totalPool[index];
            this.state.totalPool.splice(index, 1);
            this.state.playerPool.push(character);
        }
        this.resolveClick = this.resolveClick.bind(this);
    }

    componentWillMount() {
        //TODO: Call player gold, champion pool, etc. from database
    }

    getChampionName(champion) {
        return champion[0];
    }

    getChampionCost(champion) {
        return champion[1];
    }

    purchaseChampion(champion, val1) {
        if (this.state.playerGold - this.getChampionCost(champion) >= 0) {
            for (var i = 0; i < 8; i++) {
                if (this.state.hand[i] == null) {
                    this.state.hand[i] = champion;
                    this.state.playerPool[val1] = null;
                    this.state.playerGold -= this.getChampionCost(champion);
                    console.log("Purchased Champion!")
                    return;
                }
            }
        }
    }

    selectChampion(champion, val1) {
        this.state.currentSelection = champion;
        this.state.hand[val1] = null;
        this.state.previousLocation = "hand";
        this.state.previousIndex = val1;
    }

    returnToHand(val1) {
        this.state.hand[val1] = this.state.currentSelection;
        this.state.currentSelection = null;
    }

    moveChampion(val1) {
        this.state.currentSelection = this.state.board[val1];
        this.state.board[val1] = null;
        this.state.previousLocation = "board";
        this.state.previousIndex = val1;
    }

    placeChampion(champion, val1) {
        if (this.state.board[val1] != null) {
            this.state.currentSelection = this.state.board[val1];
        }
        else {
            this.state.currentSelection = null;
        }
        this.state.board[val1] = champion;
    }

    reroll() {
        if (this.playerGold - 2 < 0) {
            return;
        }
        this.playerGold -= 2;
        //ADDS MORE CHAMPIONS IF POOL RUNS LOW, PROBABLY NOT NEEDED ONCE WE ADD MORE CHAMPS
        if (this.state.totalPool.length < 10) {
            for (var i = 0; i < 15; i++) {
                this.state.totalPool.push("Garen");
                this.state.totalPool.push("Darius");
            }
        }
        // END DUMMY CODE
        this.state.playerPool = [];
        while (this.state.playerPool.length < 5) {
            var length = this.state.totalPool.length;
            var index = Math.floor(Math.random() * Math.floor(length));
            var character = this.state.totalPool[index];
            this.state.totalPool.splice(index, 1);
            this.state.playerPool.push(character);
        }
    }

    exp() {
        this.state.exp += 4;
        this.levelUp();
    }

    levelUp() {
        // lower_bound <= level < upper_bound
        var expNeeded = [0, 2, 4, 10, 20, 40, 72, 122, 188, 9999]
        var lvl;
        for (var i = 0; i < expNeeded.length - 1; i++) {
            if (this.state.playerEXP < expNeeded[i+1]) {
                lvl = i + 1;
                break;
            }
        }
        if (lvl != this.state.playerLevel) {
            this.state.totalChampionSlots += 1;
            if (lvl == 2) {
                this.addChampsLevel2();
            }
            else if (lvl == 3) {
                this.addChampsLevel3();
            }
            else if (lvl == 4) {
                this.addChampsLevel4();
            }
            else if (lvl == 5) {
                this.addChampsLevel5();
            }
            else if (lvl == 6) {
                this.addChampsLevel6();
            }
            else if (lvl == 7) {
                this.addChampsLevel7();
            }
            else if (lvl == 8) {
                this.addChampsLevel8();
            }
            else if (lvl == 9) {
                this.addChampsLevel9();
            }
        }
        this.state.playerLevel = lvl;
    }
    
    addChampsLevel2() {
        return;
    }
    addChampsLevel3() {
        return;
    }
    addChampsLevel4() {
        return;
    }
    addChampsLevel5() {
        return;
    }
    addChampsLevel6() {
        return;
    }
    addChampsLevel7() {
        return;
    }
    addChampsLevel8() {
        return;
    }
    addChampsLevel9() {
        return;
    }

    resolveClick(type, val1=false) {
        if (type === "PurchaseChampion") {
            if (this.state.playerPool[val1] != null) {
                var bought = this.state.playerPool[val1];
                this.purchaseChampion(bought, val1);
            }
        } else if (type === "EndPlacementTurn") {
            console.log("END TURN");
            if (this.state.previousLocation == "board" && this.state.currentSelection != null) {
                this.state.board[this.state.previousIndex] = this.state.currentSelection;
                this.state.previousLocation = null;
                this.state.previousIndex = null;
                this.state.currentSelection = null;
            } else if (this.state.previousLocation == "hand" && this.state.currentSelection != null) {
                this.state.hand[this.state.previousIndex] = this.state.currentSelection;
                this.state.previousLocation = null;
                this.state.previousIndex = null;
                this.state.currentSelection = null;
            }
            for (var i = 0; i < 18; i++) {
                console.log(this.state.board[i]);
            }
        } else if (type === "Location") {
            if (this.state.currentSelection != null) {
                this.placeChampion(this.state.currentSelection, val1);
            } else {
                this.moveChampion(val1);
            }

        } else if (type == "Reroll") {
            this.reroll();
        } else if (type == "Exp") {
            this.exp();
        } else if (type == "ClickHand") {
            if (this.state.hand[val1] == null) {
                this.returnToHand(val1);
            }
            var selected = this.state.hand[val1];
            this.selectChampion(selected, val1);
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
                    <Reroll
                        resolveClick = {this.resolveClick}
                    />
                    <Exp
                        resolveClick = {this.resolveClick}
                    />
                </div>
            )
        }
    }
}

export default Room;