import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class Exp extends React.Component {
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
                    onClick={()=>this.props.resolveClick("Exp", val)}
                    variant="contained"
                    color="primary"
                    fullWidth
                >{"EXP"}</Button>
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
                {this.renderRow(0, 0)}
            </Grid>
        )
    }
}

export default Exp;