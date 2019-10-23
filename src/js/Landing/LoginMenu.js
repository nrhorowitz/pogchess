import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
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
        this.renderButtons = this.renderButtons.bind(this);
        this.resolveClick = this.resolveClick.bind(this);
        this.signUpUser = this.signUpUser.bind(this);
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

    renderButtons() {
        return (
            <Grid container>
                <Grid item xs={6}>
                    <Button 
                        variant='contained' 
                        color="primary"
                        onClick={()=>this.resolveClick("Login")}
                        fullWidth
                    >LOGIN</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button 
                        variant='contained' 
                        color="primary" 
                        onClick={()=>this.resolveClick("SignUp")}
                        fullWidth
                    >CREATE ACCOUNT</Button>
                </Grid>
                <Grid item xs={4}>
                    <Button 
                        variant='contained' 
                        color="primary" 
                        onClick={()=>this.resolveClick("Google")}
                        fullWidth
                    >GOOGLE</Button>
                </Grid>
                <Grid item xs={4}>
                    <Button 
                        variant='contained' 
                        color="primary" 
                        onClick={()=>this.resolveClick("Facebook")}
                        fullWidth
                    >FACEBOOK</Button>
                </Grid>
                <Grid item xs={4}>
                    <Button 
                        variant='contained' 
                        color="primary" 
                        onClick={()=>this.resolveClick("Github")}
                        fullWidth
                    >GITHUB</Button>
                </Grid>
            </Grid>
        )
    }

    resolveClick(type) {
        if (type === "Login") {
            this.signUpUser("Login");
        } else if (type === "SignUp") {//TODO: check token
            //this.setState({redirect: '/signup'});
            this.signUpUser("Email");
        } else if (type === "Google") {
            this.signUpUser("Google");
        }
    }

    signUpUser(type=false) {
        if (type == "Google") {
            var provider = new this.props.firebase.auth.GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
            this.props.firebase.auth().languageCode = 'en';
            provider.setCustomParameters({
                'login_hint': 'user@example.com'
            });
            this.props.firebase.auth().signInWithPopup(provider).then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // ...
              }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                console.log(errorMessage);
                // ...
              });
        } else if (type === "Email") {
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
        } else if (type === "Login") {
            this.props.firebase.auth().signInWithEmailAndPassword(this.state.inputEmail, this.state.inputPassword).catch((error) => {
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
        
    }
    
    render() {
        return (
            <div className="card-auth">
                <TextField 
                    label='USERNAME/EMAIL' 
                    variant="outlined" 
                    fullWidth 
                    error={this.state.inputEmailError} 
                    value={this.state.inputEmail}
                    onChange={(e)=>this.setState({inputEmail: e.target.value})}
                />
                <TextField 
                    label='PASSWORD' 
                    variant="outlined" 
                    fullWidth 
                    error={this.state.inputPasswordError}
                    value={this.state.inputPassword}
                    onChange={(e)=>this.setState({inputPassword: e.target.value})}
                />   
                {this.renderButtons()}
                {this.renderMessage()}
            </div>
        )
    }
}

export default LoginMenu;