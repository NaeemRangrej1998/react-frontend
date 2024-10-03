import React, {useEffect, useState} from 'react'
import {getAllUsers} from "../api/use.api";
import {Link} from "react-router-dom";
import Loader from '../commons/Loader';

function ShowUser() {
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        getAllUsers().then((res) => {
            if (res.status && res.status === 200) {
                const {data: responseData} = res;
                console.log("responseData", responseData);
                setUser(responseData)
            }
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    if (user.length < 0) {
        return <h1>no user found</h1>;

    } else {
        return (
            <div className="mt-5">
                {isLoading && <Loader />}
                {error && <p>Error: {error}</p>}
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Email</th>
                        <th>RoleName</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {user?.map((user, i) => {
                        return (
                            <tr key={i}>
                                <td>{user.id}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.roleId}</td>
                                <td>
                                    <Link to={`/edit-user/${user.id}`}>
                                        <i className="fa fa-pencil" aria-hidden="true"></i>
                                    </Link>
                                    <Link to={`/user/${user.id}`}>
                                        <i className="fa fa-eye" aria-hidden="true"></i>
                                    </Link>
                                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>

            </div>
        )
    }

}

export default ShowUser
