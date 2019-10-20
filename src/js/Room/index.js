import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";


class Room extends React.Component {
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
        } else if (type === "PurchaseChampion1") {
            console.log("bought champ 1")
            //action
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
                        onClick={()=>this.resolveClick("PurchaseChampion1")}
                        variant="contained"
                        color="primary"
                    >PURCHASE CHAMPION 1</Button>
                </div>
            )
        }
    }
}

export default Room;