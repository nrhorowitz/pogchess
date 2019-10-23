import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Background from '../Landing/Background.js';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";

class MatchFinder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: '',
            showLoginMenu: false,
        }
        this.resolveClick = this.resolveClick.bind(this);
    }

    resolveClick(type) {
        if (type === "Cancel") {
            console.log('cancel')
            //TODO: REMOVE FROM QUEUE
            this.setState({redirect: '/'});
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
                    <div className='card'>
                        <Typography variant="h6">{"(TODO: PICTURE/NAME) LOGGED IN AS " + this.props.firebase.auth().currentUser.uid}</Typography>
                        <Button
                            variant='contained'
                            color='secondary'
                            onClick={()=>this.resolveClick("Cancel")}>CANCEL</Button>
                    </div>
                </div>
            )
        }
    }
}

export default MatchFinder;