import React, { Component } from 'react'
import { Input } from '@material-ui/core'
import { withStyles } from '@material-ui/core'
import { Button } from '@material-ui/core'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import DeleteIcon from '@material-ui/icons/Delete';


const styles = theme => ({
    textarea: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        margin: theme.spacing(2, 'auto'),
    },
})

class AddCollabForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            addedCollab: '',
        }
    }
    handleChange = (e) => {
        console.log(e.target.value)
        this.setState({
            addedCollab: e.target.value
        })
    }

    //TODO Set other properties here 
    
   

    render () {
        return(
            <div>
                <form onSubmit={(e)=>this.props.addCollab(e, this.state.addedCollab)}>
                    <Input placeholder='Enter Collaborator' type='text' id='addedCollab' name='addedCollab' onChange={this.handleChange} value={this.state.title} ></Input>
                    <Button type='submit'>Add</Button>
                </form>
                <Grid item xs={12} md={6}>
                    <div>
                        <List>
                            {this.props.collaborators.map(collab=> {
                            return(
                            <ListItem> 
                            <ListItemAvatar>
                                <AccountCircleIcon/>
                            </ListItemAvatar>
                            <ListItemText primary={collab}/>
                            <ListItemSecondaryAction >
                                <IconButton onClick={()=>this.props.deleteCollab(this.props.noteID, collab)} edge="end" aria-label="delete">
                                <DeleteIcon fontSize='small' />
                                </IconButton>
                            </ListItemSecondaryAction>
                            </ListItem>
                            )})}
                        </List>
                    </div>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(AddCollabForm)