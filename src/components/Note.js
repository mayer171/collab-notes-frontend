import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core'
import { Container } from '@material-ui/core'
import { Paper } from '@material-ui/core'
import AddCollabsPopover from './AddCollabsPopover'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SlateEditor from './SlateEditor'
import { GetNote, UpdateNote } from '../helpers/noteHelpers'
import EditableTitle from './EditableTitle';

const styles = theme => ({

    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    note : {
        margin: '10px'
    },
    title : {
      fontSize: '2rem',
      fontWeight: 'bold',
      border: 'none',
      width: '100%',
      boxSizing: 'border-box',
      textAlign: 'left',
      padding: '0.5em 1rem 0 1rem',
    }
})

class MainNote extends Component {
    constructor(props){
        super(props);
        this.state = {
            _id: '',
            title: '',
            content: '',
            owner: '',
            authorizedEditors: [],
            createdAt: null,
            editedAt: null,
            renderEditor: false,
            isAuthor: false,
        };
        this.handleSaveNote = this.handleSaveNote.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e) {
        console.log(e.target)
        this.setState({value: e.target.value})
    }

    //Update route
    handleSaveNote(e) {
      console.log('submit')
        UpdateNote(this.props.noteID, {title: this.state.title}).then(res => {
            if(res.success) {
              console.log(res);
            }
        })
    }

    titleChange = (e) => {
        this.setState({
          title: e.target.value,
        })
    }

    componentDidMount() {
        GetNote(this.props.noteID).then(res =>{
            if (res.success) {
                const newState = {
                    _id: res.data._id,
                    title: res.data.title,
                    owner: res.data.owner,
                    authorizedEditors: res.data.authorizedEditors,
                    renderEditor: true,
                    isAuthor: (res.currentUser === res.data.owner)
                  } 
                  if(res.data.content){
                      newState.content = JSON.parse(res.data.content)
                  } else {newState.content = null}
              this.setState(newState)
            }
        })
    }


    render() {
        const { classes } = this.props;
        return (
            <Container className={classes.note} maxWidth='sm'>
                <form onSubmit={this.handleSubmit}>
                    <Paper className={classes.paper}>
                        <AppBar position="static">
                            <Toolbar variant='dense' className={classes.toolbar}>
                                {this.state.isAuthor
                                ?<AddCollabsPopover noteID={this.props.noteID}/>
                                :<div></div>
                                }
                                
                                <Button  variant="contained" color="primary" onClick={this.handleSaveNote}> Save Note</Button>
                            </Toolbar>
                        </AppBar>
                        { this.state.renderEditor && <EditableTitle title={this.state.title} handleChange={this.titleChange} class={classes.title}/>}
                        { this.state.renderEditor && <SlateEditor docID={this.props.noteID} content={this.state.content}/> }
                    </Paper>
                </form>
            </Container>
        )
    }
}

export default withStyles(styles, {withTheme: true})(MainNote)
