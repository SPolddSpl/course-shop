import axios from 'axios';
import * as React from 'react';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: { login: '', password: '', isLogged: false } };

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

    submitHandle() {
        const data = {
            login: this.state.user.login,
            password: this.state.user.password
        }

        axios.get(`https://6025022636244d001797b4c4.mockapi.io/shop/users?search=${data.login}`).then((res) => {
            if (res.data) {

                if (res.data[0].password === data.password) {
                    this.setState({ isLogged: true });
                }
            }
        })
    }

    render() {
        if (this.state.isLogged) {
            return <div>Logged In</div>
        }
        return (
            <div>
                <h1>Log In</h1>
                <input type="text" placeholder="Login" onChange={this.inputChangeHandle} />
                <input type="password" placeholder="Password" onChange={this.inputChangeHandle} />
                <button type="submit" onClick={this.submitHandle}>Log In</button>
            </div>)
    }
}

export default Login;