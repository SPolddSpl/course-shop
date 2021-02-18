import * as React from 'react';
import { Redirect } from 'react-router-dom';
import '../Home/index.css';
import Products from '../Products';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: JSON.parse(localStorage.getItem('user')), route: '' }
        this.setRoute = this.setRoute.bind(this);
    }

    setRoute(route) {
        this.setState({ route: route });
    }

    render() {
        return (<>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="#">
                        <img src={this.state.user.avatar} alt="" width="50" height="50" className="d-inline-block rounded-circle align-center mr-5" />
                        {this.state.user.login}
                    </a>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => this.setRoute('/home/products')}>Products</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Cart</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div>
                {this.state.route == '/home/products' ? <Products /> : ''}
            </div>
        </>
        )
    }

}




