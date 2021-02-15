import * as React from 'react';
import Register from '../Register';
import Login from '../Login';
import { BrowserRouter, Redirect, Route, Router } from 'react-router-dom';

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: {}, route: null, compName: '', location: '' };
    }

    componentDidMount() {
        console.log('Init')
        const user = localStorage.getItem('user');
        console.log(user)
        if (user !== null) {
            this.setState({ user: user, route: 'login', compName: 'Login' });
            console.log(this.state)
        } else {
            this.setState({ user: null, route: 'register', compName: 'Register' });
            console.log(this.state)
        }
    }


    render() {
        return (
            <BrowserRouter>
                <Redirect to={this.state.route} />
            </BrowserRouter>

        )
    }

}

export default Welcome;
