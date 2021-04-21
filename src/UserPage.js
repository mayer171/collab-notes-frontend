import React, { Component } from 'react'
import Note from './components/Note'
import { withStyles } from '@material-ui/core'
import { GetUserOwnNotes } from './helpers/noteHelpers'
import { GetUserSharedNotes } from './helpers/noteHelpers'

const styles = theme => ({
    textarea: {
        display: 'flex',
        flexDirection: 'column',
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
                sharedNotes: '',
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
            console.log(res.data)
        }
    }))
}

    render(){
        const { classes } = this.props
        return(
            <div className={classes.textarea}>
                {this.state.noteSelected
                ? <Note
                    noteId = {this.state.selectedNoteId}
                />
            :
                <ul>{this.state.userNotes.map(note => {
                   return (<li>{note.title}</li>)
                })}</ul>
            }
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(UserPage)
