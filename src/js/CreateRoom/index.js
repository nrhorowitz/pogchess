import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Loading from '../Loading';

import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";


class CreateRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: '',
            name: '',
        }
        this.resolveClick = this.resolveClick.bind(this);
    }

    resolveClick(type) {
        if (type === "Create") {
            if (true) { //TODO: check token
                const id = this.props.uuidv1();
                var roomData = {
                    name: this.state.name,
                    id: id,
                    ownerId: this.props.firebase.auth().currentUser.uid,
                    status: 'public',
                };
                var userTemp = this.props.data('users', this.props.firebase.auth().currentUser.uid)['rooms'];
                userTemp.push(id);
                this.props.updateData('users', this.props.firebase.auth().currentUser.uid, 'rooms', userTemp);
                this.props.writeData('rooms', roomData, id);
                this.setState({redirect: ('/room?id=' + id)});
            }
        }
    }

    render() {
        if (!this.props.data('users', this.props.firebase.auth().currentUser.uid)) {
            return (
                <Loading></Loading>
            )
        } else if (this.state.redirect !== '') {
            return (
                <Redirect push to={this.state.redirect}></Redirect>
            )
        } else {
            //<TextField label='ROOM ID' onChange={(e)=>this.setState({roomId: e.target.value})}></TextField>
            return (
                <div>
                    <Typography variant="h1">CREATE ROOM</Typography>
                    <TextField label='NAME' onChange={(e)=>this.setState({name: e.target.value})}></TextField>
                    <Button variant="contained" color="secondary" onClick={()=>this.resolveClick("Create")}>CREATE</Button>
                </div>
            )
        }
    }
}

export default CreateRoom;