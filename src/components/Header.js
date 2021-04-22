import React from 'react'
import AddNotePopover from './AddNotePopover'
import { AppBar } from '@material-ui/core'
import { Toolbar } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));




export default function Header(props){
    const classes = useStyles()
    return(
    <AppBar position="static">
        <Toolbar className={classes.toolbar}  >
            <Box>
                <Typography> Collab-Notes</Typography>
            </Box>
            <Box>
                <AddNotePopover />
            </Box>
            <Box>
                <Button color="inherit" onClick={()=>props.signOut()}> Log Out</Button>
            </Box>
        </Toolbar>
    </AppBar>
    )
}