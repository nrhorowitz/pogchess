import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.renderSingleTile = this.renderSingleTile.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }

    renderSingleTile(val) {
        return (
            <Grid item xs={2}>
                <Button
                    onClick={()=>this.props.resolveClick("Location", val)}
                    variant="contained"
                    color="primary"
                    fullWidth
                >{"L" + val}</Button>
            </Grid>
        )
    }

    renderRow(startIndex, endIndex) {
        var display = [];
        for (var i = startIndex; i <= endIndex; i++) {
            display.push(i);
        }
        return (
            <Grid container>
                {display.map((val)=>(this.renderSingleTile(val)))}
            </Grid>
        )
    }

    render() {
        return (
            <Grid container>
                {this.renderRow(0, 4)}
                {this.renderRow(5, 9)}
                {this.renderRow(10, 14)}
            </Grid>
        )
    }
}

export default Board;