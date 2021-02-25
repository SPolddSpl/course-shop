import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import UserService from '../../services/user-service';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Login() {

    const classes = useStyles();
    const userService = new UserService();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    async function sumbitHandle() {
        const user = {
            login: login,
            password: password
        }
        const response = await userService.logIn(user);
        if (response) {
            localStorage.setItem('loggedIn', true);
            const user = JSON.parse(localStorage.getItem('user'))
            await getMenuItems(user._id);
            setLoggedIn(true);
        }


    }
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('loggedIn')) === true) {
            setLoggedIn(true);
        }
    }, [])


    if (!loggedIn) {
        return (
            <>
                <Grid container component="main" className={classes.root}>
                    <CssBaseline />
                    <Grid item xs={false} sm={4} md={7} className={classes.image} />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                </Typography>
                            <form className={classes.form} noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="login"
                                    label="Login"
                                    name="lgin"
                                    autoComplete="login"
                                    autoFocus
                                    onChange={(e) => { setLogin(e.target.value) }}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={(e) => { setPassword(e.target.value) }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        sumbitHandle();
                                    }}
                                >
                                    Sign In
                  </Button>
                                <Box mt={5}>
                                    <div>
                                    </div>
                                </Box>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </>
        )
    } else {
        return (
            <Redirect to="/home" />
        )
    }



    async function getMenuItems(userId) {
        const menuItems = await userService.getUserMenu(userId);
        localStorage.setItem('menuItems', JSON.stringify(menuItems))
    }
}


export default Login;