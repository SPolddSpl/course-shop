import React from 'react';

function Register() {

    return (
        <>
            <div>
                <div className="container">
                    <div className="row justify-content-lg-center">
                        <div className="col-sm-12 col-md-auto  d-flex justify-content-center">
                            <h1 className="display-1">Register</h1>
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-sm-12 col-md-auto col-lg-10 mt-3">
                            <input type="text" className="form-control" placeholder="Login" />
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-sm-12 col-md-auto col-lg-10 mt-3">
                            <input type="password" className="form-control" placeholder="Password" />
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-sm-12 col-md-auto col-lg-10 mt-3">
                            <input type="file" className="form-control form-control-lg" placeholder="Avatar" />
                        </div>
                    </div>
                    <div className="row justify-content-md-center mt-3">
                        <div className="col-sm-12 col-md-auto  d-flex justify-content-center">
                            <button className="btn btn-lg btn-primary" type="submit">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Register;