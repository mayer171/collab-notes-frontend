import React, { useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { SignUp } from '../../helpers/userSessionHelpers'


const useStyles = makeStyles((theme) => ({
    card: {
        marginTop: theme.spacing(8),
        padding: theme.spacing(4)
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginBottom: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(1, 0, 1),
    },
}));


export default function SignUpForm(props) {
    const classes = useStyles();
    const username = useRef('');
    const password = useRef('');
    const confirmPassword = useRef('');

    const [ error, setError ] = useState('');

    function handleChange(e) {
        if (e.target.id === 'username'){
            username.current = e.target.value
        } else if (e.target.id === 'password'){
            password.current = e.target.value
        } else if (e.target.id === 'confirm-password') {
            confirmPassword.current = e.target.value
        }
    }
function handleSubmit(e) {
    e.preventDefault();

    if(password.current !== confirmPassword.current) {
      setError('Passwords must match.');
      return;
    }

    const creds = {
        username: username.current,
        password: password.current
    }

    SignUp(creds)
        .then( res => {
          console.log(res);
            if(res.success){
                props.setUser(true, creds.username)
            } else {
              setError(res.message);
            }
        })
}
  return (
    <Container component='main' maxWidth='xs'>
    <Paper className={classes.card} elevation={2}>
    <Typography variant='h4' style={{paddingTop: '1em'}}>
        Create Account
    </Typography>
    <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.paper}>
            <Grid container spacing={4}>
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
                <Grid item xs={12}>
                    <TextField
                        onChange={handleChange}
                        required
                        fullWidth
                        name="confirm-password"
                        label="Confirm Password"
                        type="password"
                        id="confirm-password"
                    />
                </Grid>
                </Grid>
                <Button
                    type='submit'
                    fullWidth
                    variant='outlined'
                    color='primary'
                    className={classes.submit}
                    style={{marginTop: '3em'}}
                >
                    Create Account
                </Button>
                { error &&
                  <p style={{color: 'orangered'}}>
                  {error}
                  </p>
                }

            </div>
        </form>
        </Paper>
    </Container>
  );
}
