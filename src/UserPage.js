import React, { Component } from 'react'
import Note from './components/Note'
import { withStyles } from '@material-ui/core'
import { GetUserOwnNotes, GetUserSharedNotes, DeleteNote, PostNote } from './helpers/noteHelpers'
import { Button } from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import NoteIcon from '@material-ui/icons/Note';
import DeleteIcon from '@material-ui/icons/Delete';
import { ClickAwayListener} from '@material-ui/core';
import { Box } from '@material-ui/core'
import AddNotePopover from './components/AddNotePopover';


const styles = theme => ({
    list: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        margin: theme.spacing(2, 'auto'),
    },
    note: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        margin: theme.spacing(2, 'auto'),
    },
    root: {
        flexGrow: 1,
        maxWidth: 752,
      },
     
    title: {
        margin: theme.spacing(2, 0, 2),
    },
    add: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: '10px'
    }

    
})

class UserPage extends Component{
    constructor(props){
        super(props)
            this.state = {
                userNotes: [],
                sharedNotes: [],
                noteSelected: false,
                selectedNoteId: '',
                selectedNoteCollabs: [],
            }
        }

    componentDidMount(){
        GetUserOwnNotes(this.props.currentUser)
        .then(res => {
            if(res){
                this.setState({
                    userNotes: res.data
                })
            }
        })
        .then(GetUserSharedNotes(this.props.currentUser)
        .then(res => {
            if(res){
                this.setState({
                    sharedNotes: res.data
                })
            }
        }))
    }

    handleNoteClick = (_id) => {
        let selectedNote = this.state.userNotes.filter((x) => x._id === _id)
        if(selectedNote.length === 0){
            console.log('true')
            selectedNote = this.state.sharedNotes.filter((x) => x._id === _id)
        }
        this.setState({
            noteSelected: true,
            selectedNoteId: _id,
            selectedNoteCollabs: selectedNote[0].authorizedEditors,
        })
    }

    handelClickAway = () => {
        this.setState({
            noteSelected: false,
            selectedNoteId: '',
            selectedNoteCollabs: [],
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
    handleNewNoteSubmit = (e, title) => {
        const newNote = {
            title: title
        }
        
        PostNote(newNote)
            .then(res => {
                if(res.success){
                    console.log(this.state)
                    const newNote = res.data
                    const userNoteCopy = [...this.state.userNotes]
                    userNoteCopy.unshift(newNote)
                    this.setState({
                        userNotes: userNoteCopy
                    })
                }
            }
        )  
    }

    render(){
        const { classes } = this.props
        return(
            <div> 
                <div className={classes.add}>
                <Box>
                <AddNotePopover 
                submitNote={this.handleNewNoteSubmit}/>
                </Box>
                </div>
                {this.state.noteSelected
                    ? 
                    <ClickAwayListener onClickAway={this.handelClickAway}>
                        <div className={classes.note}> 
                            <Note
                                noteID = {this.state.selectedNoteId}
                                collaborators = {this.state.selectedNoteCollabs}
                            />
                        </div>
                    </ClickAwayListener>
                    : 
                    <div className={classes.list}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" className={classes.title}>
                                User Notes
                            </Typography>
                            <div>
                                <List>
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
                                    <ListItemSecondaryAction >
                                        <IconButton key={note._id} onClick={() => this.deleteNote(note._id)} edge="end" aria-label="delete">
                                        <DeleteIcon fontSize='small' />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                    </ListItem>
                                    )})}
                                </List>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" className={classes.title}>
                                Shared Notes
                            </Typography>
                            <div >
                                <List>
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


