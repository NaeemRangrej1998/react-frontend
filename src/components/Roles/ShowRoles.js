import React, {useEffect, useState} from 'react'
import {deleteRoleById, getAllRoles} from "../../api/Roles.api";
import role from "./Role";
import {Link} from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../css/User.css';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Loader from "../../commons/Loader";
import {Slide, toast} from "react-toastify";

function ShowRoles() {
    const [roles, setRoles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);

    useEffect(() => {
        setIsLoading(true)
        getAllRoles().then((res) => {
            if (res.status == 200) {
                setRoles(res.data)
                setIsLoading(false)
            }
        }).catch((error) => {
            console.log(error)
            toast.error(error.response.data.message, {
                position: "top-center",
                transition: Slide
            })
            setIsLoading(false)
        })
    }, []);

    const handleToggle = () => {
        setIsModalOpen(!isModalOpen);  // Toggle the modal
    };


    const handleDelete = () => {
        console.log(`Deleting role with ID: ${selectedRole}`);
        deleteRoleById(selectedRole).then((res)=>{
            if (res.status==200) {
               alert( res.message)
            }
        })
        // Call the API to delete the role
        setIsModalOpen(false);  // Close the modal after deleting
    };


    return (
        // <div>{roles.map(item=>item.rollName)}</div>
        <div className="mt-5" >
            <div>
                {isLoading && <Loader/>}
            </div>
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
                {roles?.map((role, i) => {
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
                                <i className="fas fa-trash-alt" style={{cursor: "pointer"}}
                                   onClick={() => {
                                       setSelectedRole(role.id);
                                       handleToggle()
                                   }} aria-hidden="true"></i>
                            </td>
                        </tr>
                    );
                })
                }
                </tbody>
            </table>
            <Modal show={isModalOpen} onHide={handleToggle}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Role</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you sure you want to delete this roleId : {selectedRole} </p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleToggle}>Close</Button>
                    <Button variant="primary" onClick={handleDelete}>Ok</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ShowRoles
