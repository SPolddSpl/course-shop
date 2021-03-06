import React, { useState, useEffect } from "react";
import { ReactDOM } from "react-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from "@material-ui/core";
import HeaderLinks from "./HeaderLinks";
import { Redirect } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    linksContainer: {
        display: 'flex',
        width: '40%',
        justifyContent: 'space-between',

    },
    links: {
        diplay: 'flex',
        textDecoration: 'none',
        color: '#fff',
        fontFamily: 'Roboto',
        fontWeight: '600',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}));


function Header(props) {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [isLoggedOut, setLogOut] = useState(false);

    useEffect(() => {
        if (isLoggedOut) {
            localStorage.setItem('loggedIn', false);
        }
    }, [isLoggedOut])


    if (!isLoggedOut) {
        return <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Avatar alt="Cindy Baker" src={props.avatar} />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {props.username}
                    </Typography>
                    <div className={classes.linksContainer}>
                        <HeaderLinks styles={classes.links} />
                    </div>
                    <div>
                        <Button onClick={(e) => {
                            e.preventDefault()
                            setLogOut(true);
                        }}>LogOut</Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    } else {
      return  <Redirect to="/login" />
    }

}




export default Header;