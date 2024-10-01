import React, {Component} from 'react'
import {Link, withRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {login} from "../api/auth.api";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            email:"",
            password:"",
            message:""
        }


    }

    handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email: this.state.email, password: this.state.password });
            console.log(res);
            if (res.status && res.status === 200) {
                const { data: responseData } = res;

                if (responseData !== 'Invalid credentials') {
                    // Assuming token is returned in the response data
                    console.log(responseData.data);
                    localStorage.setItem('accessToken', responseData.data.token);
                    // this.props.setIsAuthenticated(true);  // Update authentication status in the parent App component
                    // return <Navigate to='/register' />
                    // Perform any state updates or actions
                    this.props.history.push('/showUser');
                } else {
                    this.setState({ message: 'Invalid credentials' });
                }
            } else {
                throw res;  // If response status is not 200, handle it as an error
            }
        } catch (error) {
            console.log('Login error:', error);
            this.setState({ message: 'Invalid credentials' });
            // Optionally handle specific error messages here
            // Example: warningToast(extractToastMessageFromError(error));
        }
    };

    render() {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Login</div>
                            <div className="card-body">
                                <form onSubmit={this.handleLogin}>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.email}
                                            onChange={(e)=>this.setState({email:e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={this.state.password}
                                            onChange={(e)=>this.setState({password:e.target.value})}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-2" >Login</button>
                                </form>
                                <div className="mt-3">
                                    <span>Not registered? <Link to="/register">Register here</Link></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);
