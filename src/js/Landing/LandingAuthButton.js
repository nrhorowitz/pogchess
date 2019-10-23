import React from 'react';
import Button from '@material-ui/core/Button';
import LoginMenu from './LoginMenu.js';

class LandingAuthButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
        this.renderLoginMenu = this.renderLoginMenu.bind(this);
    }

    renderLoginMenu() {
        if (this.props.showLoginMenu) {
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

    render() {
        if (this.props.firebase.auth().currentUser) {
            return (
                <div class="button-wrapper">
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={()=>this.props.resolveClick("Logout")}
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
                        onClick={()=>this.props.resolveClick("SignIn")}
                        size='large'
                        fullWidth
                    >SIGN IN</Button>
                    {this.renderLoginMenu()}
                </div>
            )
        }
    }
}

export default LandingAuthButton;