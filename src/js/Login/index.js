import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: '',
        };
        this.renderMessage = this.renderMessage.bind(this);
        this.resolveClick = this.resolveClick.bind(this);
    }

    renderMessage() {
        return (
            <div className='incorrect-field'>&#160;</div>
        )
    }

    resolveClick(type) {
        if (type === "SignUp") {//TODO: check token
            this.setState({redirect: '/signup'});
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
                        <div className='log-header'>Please log in to continue</div>
                        <div className='log-field-container'>
                            <div className='log-input-container'>
                                <TextField label='USERNAME/EMAIL'></TextField>
                            </div>
                            <div className='log-input-container'>
                                <TextField label='PASSWORD'></TextField>
                            </div>
                        </div>
                        {/*<div className='log-forgot-password'>Forgot password?</div>*/}
                        {this.renderMessage()}
                        <Button variant='contained'>LOGIN</Button>
                        <Button variant='contained' onClick={()=>this.resolveClick("SignUp")}>SIGNUP</Button>
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

export default Login;