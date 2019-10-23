import React from 'react';
import Button from '@material-ui/core/Button';

class PlayButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        if (!this.props.firebase.auth().currentUser) {
            return (
                <div class="button-wrapper">
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={()=>this.props.resolveClick("PlayAsGuest")}
                        size='large'
                        fullWidth
                    >PLAY AS GUEST</Button>
                </div>
            )
        } else {
            return (
                <div class="button-wrapper">
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={()=>this.props.resolveClick("PlaySignedIn")}
                        size='large'
                        fullWidth
                    >PLAY</Button>
                </div>
            )
        }
    }
}

export default PlayButton;