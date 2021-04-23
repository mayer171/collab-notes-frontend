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
    }
    handleChange(e) {
        this.setState({
            title: e.target.value
        })
    }

    render () {
        return(
            <form onSubmit={(e)=>{
                e.preventDefault()
                this.props.submitNote(e, this.state.title)}}>
                <Input placeholder='Enter Note Title' type='text' id='title' name='title' onChange={(e)=>this.handleChange(e)} value={this.state.title} ></Input>
                <Button type='submit'>Create New Note</Button>
            </form>
        )
    }
}

export default withStyles(styles, {withTheme: true})(NewNoteForm)