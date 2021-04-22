import React, { Component } from 'react'
import Note from './components/Note'
import { withStyles } from '@material-ui/core'
import { GetUserOwnNotes, GetUserSharedNotes, DeleteNote } from './helpers/noteHelpers'
import { Button } from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import NoteIcon from '@material-ui/icons/Note';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
    list: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        margin: theme.spacing(2, 'auto'),
    },
    
})

class UserPage extends Component{
    constructor(props){
        super(props)
            this.state = {
                currentUser: '',
                userNotes: [],
                sharedNotes: [],
                noteSelected: false,
                selectedNoteId: '',
            }
        }

    componentDidMount(){
        GetUserOwnNotes(this.props.currentUser)
        .then(res => {
            if(res){
                this.setState({
                    userNotes: res.data
                })
                console.log(this.state.userNotes)
            }
        }
    )
    .then(GetUserSharedNotes(this.props.currentUser)
    .then(res => {
        if(res){
            this.setState({
                sharedNotes: res.data
            })
            console.log(res.data)
        }
    }))
}

    handleNoteClick = (_id) => {
        this.setState({
            noteSelected: true,
            selectedNoteId: _id
        })
    }

    deleteNote = (_id) => {
        DeleteNote(_id)
        .then(res => {
            if(res.success){
                this.setState({
                    userNotes: this.state.userNotes.filter((x) => x._id !== _id)
                })
            }
        })
    }


    render(){
        const { classes } = this.props
        
        return(
            <div className={classes.textarea}>
                {this.state.noteSelected
                ?<Note
                    noteID = {this.state.selectedNoteId}
                />
                :<div>
                    <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.title}>
                        User Notes
                    </Typography>
                        <div className={classes.list} >
                            <List className={classes.list}>
                                {this.state.userNotes.map(note => {
                                return(
                            
                                <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <NoteIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <Button onClick={ () => this.handleNoteClick(note._id)}>
                                <ListItemText primary={note.title}/>
                                </Button>
                                <ListItemSecondaryAction>
                                    <IconButton key={note._id} onClick={() => this.deleteNote(note._id)} edge="end" aria-label="delete">
                                    <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                                </ListItem>
                                )})}
                            </List>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    
                    <Typography variant="h6" className={classes.title}>
                        Shared Notes
                    </Typography>
                        <div >
                            <List className={classes.list}>
                                {this.state.sharedNotes.map(note => {
                                return(
                            
                                <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                    <NoteIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <Button onClick={ () => this.handleNoteClick(note._id)}>
                                    <ListItemText primary={note.title}/>
                                </Button>
                                <ListItemSecondaryAction>
                                    
                                </ListItemSecondaryAction>
                                </ListItem>
                                )})}
                            </List>
                        </div>
                    </Grid>
                </div>
                }
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(UserPage)


