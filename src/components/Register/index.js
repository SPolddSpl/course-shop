import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import UserService from '../../services/user-service';
import { Redirect } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    upload: {
        width: '100%'
    }
}));

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


function Register() {
    const classes = useStyles();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const [registerComplete, setRegisterComplete] = useState(false);
    let service = new UserService();

    async function handleAvatarUpload(file) {
        setAvatar(await getBase64(file))
    }

    async function submit() {
        const data = {
            login,
            password,
            avatar
        }
        let response = await service.registerUser(data);
        if (JSON.parse(localStorage.getItem('user'))) {
            setRegisterComplete(true);
        }
    }


    useEffect(() => {
        if (registerComplete) {

        }
    }, [registerComplete])

    if (!registerComplete) {
        return (
            <>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
            </Typography>
                        <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        autoComplete="flogin"
                                        name="login"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="login"
                                        label="Login"
                                        autoFocus
                                        onChange={(e) => { setLogin(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={(e) => { setPassword(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <label htmlFor="contained-button-file" className={classes.upload}>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            component="span"
                                            className={classes.button}
                                            fullWidth
                                        >
                                            Upload Avatar
      </Button>
                                    </label>
                                </Grid>
                            </Grid>
                            <input
                                accept="image/*"
                                className={classes.input}
                                style={{ display: 'none' }}
                                id="contained-button-file"
                                type="file"
                                onChange={(e) => { handleAvatarUpload(e.target.files[0]) }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={(e) => {
                                    e.preventDefault()
                                    submit();
                                }}
                            >
                                Sign Up
              </Button>
                        </form>
                    </div>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </Container>
            </>
        )
    } else {
        return <Redirect to={'/login'} />
    }
}


function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default Register;