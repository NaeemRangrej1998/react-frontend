import React, {useEffect, useState} from 'react'
import {getAllRoles} from "../../api/Roles.api";
import role from "./Role";
import {Link} from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../css/User.css';
import {Button} from "@material-ui/core";
function ShowRoles() {
    const [roles, setRoles] = useState([]);
    useEffect(() => {
        getAllRoles().then((res) => {
            if (res.status == 200) {
                setRoles(res.data)
            }
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    function handleDelete(id) {
        console.log(id);
    }

    return (
        // <div>{roles.map(item=>item.rollName)}</div>
        <div className="mt-5">
            <Link to="create-role" className="btn btn-primary">Add Role</Link>
            <table className="table table-striped center">
                <thead>
                <tr>
                    <td>Id</td>
                    <td>RoleName</td>
                    <td>Action</td>
                </tr>
                </thead>
                <tbody>
                {roles?.map((role, i)=>{
                    return (
                        <tr>
                            <td>{role.id}</td>
                            <td>{role.rollName}</td>
                            <td className="actions">
                                <Link to={`/edit-role/${role.id}`}>
                                    <i className="fas fa-pencil-alt" aria-hidden="true"></i>
                                </Link>
                                <Link to={`/role/${role.id}`}>
                                    <i className="fas fa-eye" aria-hidden="true"></i>
                                </Link>
                                <i className="fas fa-trash-alt" style={{cursor:"pointer"}} onClick={()=>handleDelete(role.id)} aria-hidden="true"></i>
                            </td>
                        </tr>
                    );
                })
                }
                </tbody>
            </table>
        </div>
    )
}

export default ShowRoles
