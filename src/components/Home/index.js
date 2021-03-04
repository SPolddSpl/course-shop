import React, { useState, useEffect, useRef } from 'react';
import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';
import UserService from '../../services/user-service';
import Header from './Header';
import Products from '../Products';



function Home() {

    const service = new UserService();
    const [open, setOpen] = useState(false);

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [avatar, setAvatar] = useState(user.avatar);
    let { path, url } = useRouteMatch();
    const [route, setRoute] = useState(window.location.pathname);
    const [menuItems, setMenuItems] = useState(JSON.parse(localStorage.getItem('menuItems')));
    useEffect(() => {
        document.title = 'Home';
    }, [])
    return (
        <>
            <Header username={user.login} avatar={service.getFile(avatar)} />
            <Grid
                container
                justify="center"
                align="center"
                style={{ marginTop: '10px' }}>
                <Switch>
                    <Route path="/home/products" component={Products} />
                    <Route exact path="/home" />
                </Switch>
            </Grid>
        </>
    )

}

export default Home;
