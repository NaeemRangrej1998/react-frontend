import React, {Component} from 'react'
import {Link, withRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {login} from "../../api/auth.api";
import {setTokenInLocalStorage,setUserRoleInLocalStorage} from "../../utils/UserDetailsTokenService";
import {Slide, toast, Zoom} from "react-toastify";

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
           await login({ email: this.state.email, password: this.state.password }).then((res)=>{
                if (res.status && res.status === 200) {
                    const { data: responseData } = res;

                    if (responseData !== 'Invalid credentials') {
                        // Assuming token is returned in the response data
                        setTokenInLocalStorage(responseData.data.token);
                        setUserRoleInLocalStorage( responseData.data.userRole);
                        toast.success('Login successful!',{
                            transition: Slide,
                            position: "top-center"
                        });
                        this.props.history.push('/showUser');
                    } else {
                        this.setState({ message: 'Invalid credentials' });
                        toast.error('Login successful!',{
                            transition: Slide,
                            position: "top-center"
                        });
                    }
                } else {
                    throw res;  // If response status is not 200, handle it as an error
                }
            }).catch(error => {
                toast.error(error.response.data.error, {
                    transition: Slide,
                    position: "top-center"
                })
            });
        } catch (error) {
            console.log('Login error:', error);
            this.setState({ message: 'Invalid credentials' });
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
