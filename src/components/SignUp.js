import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';
import { Paper } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    card: {
        padding: '10px'
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(1, 0, 1),
    },
}));


export default function SignIn() {
  const classes = useStyles();

function handleChange(e) {
    console.log(e.target)
}
function handleSubmit(e) {
    e.preventDefault();
    alert('Saving State to Mongo...(not really)')
}
  return (
      
    <Container component='main' maxWidth='xs'>
    <Paper className={classes.card} elevation={3}>
    <Typography component='h1'>
        Sign In
    </Typography>
    <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.paper}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        onChange={handleChange}
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        onChange={handleChange}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                    />
                </Grid>
            </Grid>
            
            <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
            >
                Sign-up
            </Button>
        </div>
    </form>
    </Paper>
</Container>
       
  );
}