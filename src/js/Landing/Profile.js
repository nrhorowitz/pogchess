import React from 'react';
import Typography from '@material-ui/core/Typography';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        if (this.props.firebase.auth().currentUser) {
            return (
                <div>
                    <Typography variant="h6">{"(TODO: PICTURE/NAME) LOGGED IN AS " + this.props.firebase.auth().currentUser.uid}</Typography>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default Profile;