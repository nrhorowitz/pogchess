import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Loading from '../Loading';

import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: '',
        }
        this.resolveClick = this.resolveClick.bind(this);
        this.loading = this.loading.bind(this);
        this.renderRoomIcon = this.renderRoomIcon.bind(this);
        this.renderRoomIcons = this.renderRoomIcons.bind(this);
    }

    loading() {
        if (this.props.data('users', this.props.firebase.auth().currentUser.uid)) {
            const r = this.props.data('users', this.props.firebase.auth().currentUser.uid)['rooms'];
            for (var i in r) {
                if (!this.props.data('rooms', r[i])) {
                    return true;
                }
            }
        } else {
            return true;
        }
        return false;
    }

    resolveClick(type, id=false) {
        if (type === "CreateRoom") {
            if (true) { //TODO: check token
                this.setState({redirect: '/createroom'});
            }
        } else if (type === "Room") {
            if (true) { //TODO: check token and id
                const pathId = '/room?id=' + id;
                this.setState({redirect: pathId});
            }
        }
    }

    renderRoomIcon(id) {
        const d = this.props.data('rooms', id);
        return (
            <Button variant="contained" color="primary" onClick={()=>this.resolveClick("Room", id)}>{d['name']}</Button>
        )
    }

    renderRoomIcons() {
        const r = this.props.data('users', this.props.firebase.auth().currentUser.uid)['rooms'];
        return (
            <div>
                {r.map((id) => this.renderRoomIcon(id))}
            </div>
        )
    }

    render() {
        if (this.loading()) {
            return (
                <Loading></Loading>
            )
        } else if (this.state.redirect !== '') {
            return (
                <Redirect push to={this.state.redirect}></Redirect>
            )
        } else {
            return (
                <div>
                    <Typography variant="h1">DASHBOARD</Typography>
                    {this.renderRoomIcons()}
                    <Button variant="contained" color="secondary" onClick={()=>this.resolveClick("CreateRoom")}>CREATE NEW ROOM</Button>
                </div>
            )
        }
    }
}

export default Dashboard;