import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";


class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: '',
            email: '',
            password: '',
        };
        this.renderMessage = this.renderMessage.bind(this);
        this.resolveClick = this.resolveClick.bind(this);
        this.signUpNewUser = this.signUpNewUser.bind(this);
    }

    renderMessage() {
        return (
            <div className='incorrect-field'>&#160;</div>
        )
    }

    resolveClick(type) {
        if (type === "SignUp") {//TODO: check token, valid fields
            this.signUpNewUser(this.state.email, this.state.password);
        }
    }

    signUpNewUser(email, password) {
        console.log(email, password);
        if (true) {//TODO: lookup email for already made account
            this.props.firebase.auth().createUserWithEmailAndPassword(email, password).catch(err => {
                // Handle Errors here.
                var errorCode = err.code;
                var errorMessage = err.message;
                //TODO: responsive UI

                console.log(errorCode);
                console.log(errorMessage);
            }).then(() => {
                this.setState({redirect: '/dashboard'});
            });
        }
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
                        {/*<div className='log-logo'><img src={logo}/></div>*/}
                        <Typography variant='h1'>POGCHAT</Typography>
                        <div className='log-header'>Please SIGNUP</div>
                        <div className='log-field-container'>
                            <div className='log-input-container'>
                                <TextField label='EMAIL' onChange={(e)=>this.setState({email: e.target.value})}></TextField>
                            </div>
                            <div className='log-input-container'>
                                <TextField label='PASSWORD' onChange={(e)=>this.setState({password: e.target.value})}></TextField>
                            </div>
                        </div>
                        {/*<div className='log-forgot-password'>Forgot password?</div>*/}
                        {this.renderMessage()}
                        <Button variant='contained' onClick={()=>this.resolveClick("SignUp")}>SIGNUP</Button>
                        <Button variant='contained'>LOGIN</Button>
                        <div className='log-footer-area'>
                            <div className='log-footer'>Don't have an account? <Link to="/signup?id=1"><span className='link'>Join us</span></Link></div>
                            <div className='log-footer'>By continuing, you agree to the <br/><Link to="/TOS"><span className='link'>Terms of Service</span></Link> and <Link to="/privacy"><span className='link'>Privacy Policy</span></Link></div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default SignUp;