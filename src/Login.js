import React from 'react';
import './Login.css';
export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.login = { value: '' };
        this.pass = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState(this.login.value = event.target.value);
    }

    handleSubmit(event) {
        alert('Отправленное имя: ' + this.state.value);
        event.preventDefault();
    }


    submit() {
        console.log('Hello')
    }

    render() {
        return (
            <div className="title">
                <div className="form">
                    <h1>Hello, {this.props.name}</h1>
                    <input value={this.login.value} onChange={this.handleChange} type="text" placeholder="Login" />
                    <input value={this.pass.value} onChange={this.handleChange} type="password" placeholder="Password" />

                    <button type="submit" onClick={this.submit}>Submit</button>
                </div>
            </div>
        );
    }
}