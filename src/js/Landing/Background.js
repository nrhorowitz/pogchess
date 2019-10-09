import React from 'react';
import './index.css';

class Background extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        if (this.props.active) {
            return (
                <div>
                    <div id='stars'></div>
                    <div id='stars2'></div>
                    <div id='stars3'></div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
        
    }
}

export default Background;