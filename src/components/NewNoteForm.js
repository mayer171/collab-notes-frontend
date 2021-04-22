import React, { Component } from 'react'
import { Input } from '@material-ui/core'
import { withStyles } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { PostNote } from '../helpers/noteHelpers'

const styles = theme => ({
    textarea: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        margin: theme.spacing(2, 'auto'),
    },
})

class NewNoteForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            title: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e) {
        this.setState({
            title: e.target.value
        })
    }

    handleSubmit(e){
        const newNote = {
            title: this.state.title
        }
        PostNote(newNote)
            .then(res => {
                if(res){
                    console.log(res)
                }
            })
        this.setState({
            title: '',
        })
    }

    render () {
        return(
            <form onSubmit={(e)=>this.handleSubmit(e)}>
                <Input placeholder='Enter Note Title' type='text' id='title' name='title' onChange={(e)=>this.handleChange(e)} value={this.state.title} ></Input>
                <Button type='submit'>Create New Note</Button>
            </form>
        )
    }
}

export default withStyles(styles, {withTheme: true})(NewNoteForm)