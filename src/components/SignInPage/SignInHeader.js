import React from 'react'
import { AppBar } from '@material-ui/core'
import { Toolbar } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));


export default function SignInHeader(props){
    const classes = useStyles()
    let buttonText = ''
    if(props.signInState === true){
        buttonText = 'Log In'
    } else {
        buttonText = 'Sign Up'
    }

    
    return(
    <AppBar position="static">
        <Toolbar className={classes.toolbar}  >
            <Box>
                <Typography> Collab-Notes</Typography>
            </Box>
            <Box>
                <Button color="inherit" onClick={() => props.toggleSignIn(props.signInState)}>{buttonText}</Button>
            </Box>
        </Toolbar>
    </AppBar>
    )
}