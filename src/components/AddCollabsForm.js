import React, { Component } from 'react'
import { Input } from '@material-ui/core'
import { withStyles } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { AddCollaborator } from '../helpers/noteHelpers'

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
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e) {
        console.log(e.target.value)
        this.setState({
            addedCollab: e.target.value
        })
    }

    //TODO Set other properties here 
    handleSubmit(e){
        e.preventDefault()
        console.log(this.props.noteID)
        AddCollaborator(this.props.noteID, this.state.addedCollab)
        .then(res => {
            console.log(res)
        })
        this.setState({
            addedCollab: ''
        })
    }
    render () {
        return(
            <form onSubmit={(e)=>this.handleSubmit(e)}>
                <Input placeholder='Enter Collaborator' type='text' id='addedCollab' name='addedCollab' onChange={(e)=>this.handleChange(e)} value={this.state.title} ></Input>
                <Button type='submit'>Add</Button>
            </form>
        )
    }
}

export default withStyles(styles, {withTheme: true})(AddCollabForm)