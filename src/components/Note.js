import React, { Component } from 'react'
import { TextareaAutosize } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core'
import { Container } from '@material-ui/core'
import { Paper } from '@material-ui/core'
import AddCollabsPopover from './AddCollabsPopover'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


const styles = theme => ({
    textarea: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '99%',
        border:'none',
        overflow: 'auto',
        outline: 'none',
    
        
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    note: {
        margin: '10px'
    }
}) 

class MainNote extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            text: '',
            owner: '',
            authorizedEditors: [],
            createdAt: null,
            editedAt: null,
        };
        this.handleSaveSubmit = this.handelSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    
    handleChange(e) {
        console.log(e.target)
        this.setState({value: e.target.value})
    }

    //Update route 
    handelSubmit(e) {
        e.preventDefault();
        alert('Saving State to Mongo...(not really)')
    }

    render() {
        const { classes } = this.props;
        return (
            <Container className={classes.note} maxWidth='sm'> 
                <form onSubmit={this.handleSubmit}>
                    <Paper className={classes.paper}>
                        <AppBar position="static">
                            <Toolbar variant='dense' className={classes.toolbar}>
                                <AddCollabsPopover />
                                <Button  variant="contained" color="primary"> Save Note</Button>
                            </Toolbar>
                        </AppBar>
                        <TextareaAutosize
                            className={classes.textarea}
                            flexgrow={1}
                            rowsMin={15}
                            value={this.state.value} 
                            onChange={this.handleChange}>
                        </TextareaAutosize>
                    </Paper>
                </form>
            </Container>
        )
    }
}

export default withStyles(styles, {withTheme: true})(MainNote)