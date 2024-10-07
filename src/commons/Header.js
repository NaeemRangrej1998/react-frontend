import React from 'react'
import {Link, useHistory} from "react-router-dom";
import "./commons.css";
import {isUserAuthenticatedAsAdmin, Logout} from "../utils/UserDetailsTokenService";
import Button from "react-bootstrap/Button";

export default function Header() {
    const history = useHistory();
    let userRole = localStorage.getItem('role');
    console.log(userRole);
    const admin = isUserAuthenticatedAsAdmin();

    function handleLogout() {
        // setTimeout(()=>{
        //     Logout();
        //     history.push('/login')
        // },2000)
        Logout();
        history.push('/login')
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                    <div className="container-fluid">
                        <Link to="/" className="navbar-brand" href="src/components#">
                            <span className="navbar-text">React CRUD</span>
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#mynavbar"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="mynavbar">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="createUser">
                                        Create User
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="showUser">
                                        Show User
                                    </Link>
                                </li>
                                {admin && <li className="nav-item">
                                    <Link className="nav-link" to="showRole">
                                        Show Roles
                                    </Link>
                                </li>}

                                <div className="ms-auto">
                                    <Button color="btn btn-outline-primary mx-2 text-white"
                                            onClick={handleLogout}>Logout</Button>
                                </div>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </nav>
    )
}

