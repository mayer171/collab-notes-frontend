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
            title: e.target.value
        })
    }

    //TODO Set other properties here 
    handleSubmit(e){
        console.log(this.props.baseUrl)
        e.preventDefault()
        fetch(this.props.baseUrl, {
            method: 'POST',
            body: JSON.stringify({authorizedEditors: this.state.authorizedEditors}),
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
                <Input placeholder='Enter Collaborator' type='text' id='addedCollab' name='addedCollab' onChange={(e)=>this.handleChange(e)} value={this.state.title} ></Input>
                <Button type='submit'>Add</Button>
            </form>
        )
    }
}

export default withStyles(styles, {withTheme: true})(AddCollabForm)