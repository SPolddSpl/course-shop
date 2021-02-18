import axios from 'axios';
import * as React from 'react';
import { Redirect } from 'react-router-dom';
import Requests from '../../services/user-service/services';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: { login: '', password: '', isLogged: null } };
        this.client = new Requests();
        this.inputChangeHandle = this.inputChangeHandle.bind(this)
        this.submitHandle = this.submitHandle.bind(this)
    }

    inputChangeHandle(e) {
        const inputVal = e.target.value;
        const inputName = e.target.placeholder;
        const avatar = e.target.files;

        switch (inputName) {
            case 'Login':
                this.setState({ user: { login: inputVal, password: this.state.user.password } });
                break;
            case 'Password':
                this.setState({ user: { login: this.state.user.login, password: inputVal } });
                break;
        }
    }

    async submitHandle() {
        const data = {
            login: this.state.user.login,
            password: this.state.user.password
        }

        const response = await this.client.logIn(data);
        if (response === true) {
            this.setState({ isLogged: response });
        }
    }

    render() {
        if (this.state.isLogged) {
            return <Redirect to="/home" />
        }
        return (
            <div>
                <div className="container">
                    <div className="row justify-content-lg-center">
                        <div className="col-sm-12 col-md-auto">
                            <h1 className="display-1">Log In</h1>
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-sm-12 col-md-auto col-lg-10 mt-3">
                            <input type="text" className="form-control" placeholder="Login" onChange={this.inputChangeHandle} />
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-sm-12 col-md-auto col-lg-10 mt-3">
                            <input type="password" className="form-control" placeholder="Password" onChange={this.inputChangeHandle} />
                        </div>
                    </div>
                    <div className="row justify-content-md-center mt-3">
                        <div className="col-sm-12 col-md-auto">
                            <button className="btn btn-lg btn-primary" type="submit" onClick={this.submitHandle}>Log In</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Login;