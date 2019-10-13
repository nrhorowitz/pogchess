import React from 'react';
import Typography from '@material-ui/core/Typography';

class Leaderboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
        this.renderTopPlayers = this.renderTopPlayers.bind(this);
        this.renderSinglePlayer = this.renderSinglePlayer.bind(this);
    }

    renderTopPlayers(playerMap) {
        return (
            <div>
                {playerMap.map((id) => (this.renderSinglePlayer(id)))}
            </div>
        )
    }

    renderSinglePlayer(playerMap) {
        console.log(playerMap);
        return (
            <div>
                <img src={playerMap.imageUrl}></img>
                {playerMap.name + "  LP: " + playerMap.lp}
            </div>
        )
    }

    render() {
        return (
            <div class="card">
                <Typography variant="h2">LEADERBOARD</Typography>
                {this.renderTopPlayers(this.props.playerMap)}
            </div>
        )
    }
}

export default Leaderboard;