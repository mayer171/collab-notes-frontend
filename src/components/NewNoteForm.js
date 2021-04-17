import React, { Component } from 'react'
import { Input } from '@material-ui/core'
import { withStyles } from '@material-ui/core'
import { Button } from '@material-ui/core'

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
            text: '',
            owner: '',
            authorizedEditors: {},
            createdAt: null,
            editedAt: null,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e) {
        console.log(e.target.value)
        this.setState({
            title: e.target.value
        })
    }

    //TODO Set other properties here 
    handleSubmit(e){
        console.log(this.props.baseUrl)
        e.preventDefault()
        fetch(this.props.baseUrl, {
            method: 'POST',
            body: JSON.stringify({title: this.state.title}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( res => {
            return res.json()
        }).then( data => {
            this.setState({
                title: '',
            })
        }).catch(error => console.error({'Error': error}))
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