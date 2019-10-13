import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";


class LoginMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: '',
            inputEmail: '',
            inputPassword: '',
            inputEmailError: false,
            inputPasswordError: false,
            errorMessage: '',
        };
        this.renderMessage = this.renderMessage.bind(this);
        this.resolveClick = this.resolveClick.bind(this);
    }

    renderMessage() {
        if (this.state.errorMessage === "") {
            return (
                <Typography variant="h3">&#160;</Typography>
            )
        } else {
            return (
                <Typography variant="h6">{this.state.errorMessage}</Typography>
            )
        }
    }

    validInput(type) {
        if (type === "email") {
            //TODO: create actual email checker 
            if (this.state.inputEmail.length < 8) {
                this.setState({inputEmailError: true});
                this.setState({errorMessage: "Email must be longer than 7 characters"});
                return false;
            } else {
                this.setState({inputEmailError: false});
                return true;
            }
        } else if (type === "password") {
            if (this.state.inputPassword.length < 6) {
                this.setState({inputPasswordError: true});
                this.setState({errorMessage: "Password must be longer than 5 characters"});
                return false;
            } else {
                this.setState({inputPasswordError: false});
                return true;
            }
        }
    }

    resolveClick(type) {
        if (type === "Login") {
            if (this.validInput("email") && this.validInput("password")) {
                console.log("OK");
            }
        }
        if (type === "SignUp") {//TODO: check token
            //this.setState({redirect: '/signup'});
            if (this.validInput("email") && this.validInput("password")) {
                this.signUpUser();
            }
        }
    }

    signUpUser() {
        this.props.firebase.auth().createUserWithEmailAndPassword(this.state.inputEmail, this.state.inputPassword).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log("ERRORCODE: ", errorCode);
            console.log("ERRORMESSAGE: ", errorMessage);
            if (errorCode === "auth/invalid-email") {
                this.setState({inputEmailError: true});
                this.setState({errorMessage: "Email must be a valid email"});
            }
        });
    }
    
    render() {
        if (this.state.redirect !== '') {
            return (
                <Redirect push to={this.state.redirect}></Redirect>
            )
        } else {
            return (
                <div className='log-page'>
                    <div className='log-content'>
                        <div className='log-field-container'>
                            <div className='log-input-container'>
                                <TextField 
                                    label='USERNAME/EMAIL' 
                                    variant="outlined" 
                                    fullWidth 
                                    error={this.state.inputEmailError} 
                                    value={this.state.inputEmail}
                                    onChange={(e)=>this.setState({inputEmail: e.target.value})}
                                ></TextField>
                            </div>
                            <div className='log-input-container'>
                                <TextField 
                                    label='PASSWORD' 
                                    variant="outlined" 
                                    fullWidth 
                                    error={this.state.inputPasswordError}
                                    value={this.state.inputPassword}
                                    onChange={(e)=>this.setState({inputPassword: e.target.value})}
                                ></TextField>
                            </div>
                        </div>
                        {/*<div className='log-forgot-password'>Forgot password?</div>*/}
                        <Button variant='contained' color="primary" onClick={()=>this.resolveClick("Login")}>LOGIN</Button>
                        <Button variant='contained' color="primary" onClick={()=>this.resolveClick("SignUp")}>CREATE ACCOUNT</Button>
                        {this.renderMessage()}
                    </div>
                </div>
            )
        }
    }
}

export default LoginMenu;