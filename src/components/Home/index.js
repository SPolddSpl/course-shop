import * as React from 'react';
import { Redirect } from 'react-router-dom';
import '../Home/index.css';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: JSON.parse(localStorage.getItem('user')) }
    }



    render() {
        return (
            <div>
                <nav className="navbar navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">
                            <img src={this.state.user.avatar} alt="" width="50" height="50" className="d-inline-block rounded-circle align-center mr-5" />
                            {this.state.user.login}
                        </a>
                        <div className="d-flex navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Cart</a>
                            </li>
                        </div>
                    </div>
                </nav>

                <div className="main">
                    
                </div>
            </div>
        )
    }

}
