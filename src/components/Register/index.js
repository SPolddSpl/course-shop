import * as React from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: {}, avatar: '', isRegistered: false }
        this.sumbitHandle = this.sumbitHandle.bind(this);
        this.inputChangeHandle = this.inputChangeHandle.bind(this);
    }

    async inputChangeHandle(e) {
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
            case 'Avatar':
                let base64File = await this.getBase64(avatar[0]);
                this.setState({ avatar: base64File });
                break;
        }
    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }


    sumbitHandle() {
        const data = {
            login: this.state.user.login,
            createdAt: new Date().toLocaleString(),
            password: this.state.user.password,
            avatar: this.state.avatar
        }

        axios.post('https://6025022636244d001797b4c4.mockapi.io/shop/users', data).then((res) => {
            const resBody = res.data;
            if (resBody) {
                const newUser = {
                    id: resBody.id,
                    login: resBody.login,
                    createdAt: resBody.createdAt,
                    avatar: resBody.avatar
                }

                localStorage.setItem('user', JSON.stringify(newUser));
                this.setState({ isRegistered: true });
            }

        })

    }

    render() {
        if (this.state.isRegistered) {
            return <Redirect to="/Login" />
        }
        return (
            <div>
                <div className="container">
                    <div className="row justify-content-lg-center">
                        <div className="col-sm-12 col-md-auto">
                            <h1 className="display-1">Register</h1>
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
                    <div className="row justify-content-md-center">
                        <div className="col-sm-12 col-md-auto col-lg-10 mt-3">
                            <input type="file" className="form-control form-control-lg" placeholder="Avatar" onChange={this.inputChangeHandle} />
                        </div>
                    </div>
                    <div className="row justify-content-md-center mt-3">
                        <div className="col-sm-12 col-md-auto">
                            <button className="btn btn-lg btn-primary" type="submit" onClick={this.sumbitHandle}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default Register;