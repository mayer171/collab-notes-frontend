import React, { Component } from 'react'
import { TextareaAutosize } from '@material-ui/core'
import { Input } from '@material-ui/core'
import { withStyles } from '@material-ui/core'
import { Container } from '@material-ui/core'
import { Paper } from '@material-ui/core'

const styles = theme => ({
    textarea: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        margin: theme.spacing(2, 'auto'),
    },
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
        this.handleSubmit = this.handelSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        console.log(e.target)
        this.setState({value: e.target.value})
    }
    handelSubmit(e) {
        e.preventDefault();
        alert('Saving State to Mongo...(not really)')
    }

    render() {
        const { classes } = this.props;
        return (
            <Container maxWidth='sm'> 
                <form onSubmit={this.handleSubmit}>
                    <Paper>
                        <TextareaAutosize
                            className={classes.textarea}
                            flexgrow={1}
                            rowsMin={15}
                            value={this.state.value} 
                            onChange={this.handleChange}>
                        </TextareaAutosize>
                    </Paper>
                    <Input type='submit' value='Save Note'></Input>
                </form>
            </Container>
        )
    }
}

export default withStyles(styles, {withTheme: true})(MainNote)