import React, { useState, useEffect, useRef } from 'react';
import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import UserService from '../../services/user-service';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar'
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Reorder from '@material-ui/icons/Reorder';
import Products from '../Products';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    avatar: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '90%',
        alignItems: 'center'
    }
}));



function Home() {

    const service = new UserService();

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [avatar, setAvatar] = useState(localStorage.getItem('avatar'));
    let { path, url } = useRouteMatch();
    const [menuItems, setMenuItems] = useState(JSON.parse(localStorage.getItem('menuItems')));
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <> <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className={classes.avatar}>
                        <Typography variant="h6" noWrap>
                            {user.login}
                        </Typography>
                        <Avatar alt="User Avatar" src={service.getFile(avatar)} onClick={(e) => { console.log(`Avatar clicked`) }} />
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem button key={item.ItemName} component={Link} to={`${path}/products`}>
                            <ListItemIcon>{item.IconName === 'Reorder' ? <Reorder /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={item.ItemName}>
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Drawer>


            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <Route path={`${url}/products`} component={Products} />
                </Switch>
            </main>
        </div>
        </>
    )

}

export default Home;

export const useWillMount = (fn) => {
    const willMount = useRef(true)

    if (willMount.current && fn && typeof fn === 'function') {
        fn()
    }

    willMount.current = false
}