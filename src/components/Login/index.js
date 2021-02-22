import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import UserService from '../../services/user-service';

function Login() {
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
            setLoggedIn(true);
            localStorage.setItem('loggedIn', true);
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
                <div>
                    <div className="container">
                        <div className="row justify-content-lg-center">
                            <div className="col-sm-12 col-md-auto d-flex justify-content-center">
                                <h1 className="display-1">Log In</h1>
                            </div>
                        </div>
                        <div className="row justify-content-md-center">
                            <div className="col-sm-12 col-md-auto col-lg-10 mt-3">
                                <input type="text" className="form-control" placeholder="Login" onChange={e => setLogin(e.target.value)} />
                            </div>
                        </div>
                        <div className="row justify-content-md-center">
                            <div className="col-sm-12 col-md-auto col-lg-10 mt-3">
                                <input type="password" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                            </div>
                        </div>
                        <div className="row justify-content-md-center mt-3">
                            <div className="col-sm-12 col-md-auto d-flex justify-content-center">
                                <button className="btn btn-lg btn-primary" type="submit" onClick={sumbitHandle}>Log In</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <Redirect to="/home" />
        )
    }
}


export default Login;