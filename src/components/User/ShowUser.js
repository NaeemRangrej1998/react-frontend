import React, {useEffect, useState} from 'react'
import {deleteUserById, getAllUsers} from "../../api/use.api";
import {Link, useHistory} from "react-router-dom";
import Loader from '../../commons/Loader';
import '../../css/User.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ShowUser() {
    const history=useHistory();
    const [user, setUser] = useState([]);
    const [selectedUSerId, setSelectedUserId] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        setIsLoading(true)
        getAllUsers().then((res) => {
            if (res.status && res.status === 200) {
                const {data: responseData} = res;
                console.log("responseData", responseData.content);
                setUser(responseData.content)
                setIsLoading(false)
            }
        }).catch((error) => {
            setIsLoading(false)
            console.log(error)
        })
    }, []);

    function handleDelete() {
        deleteUserById(selectedUSerId).then((res) => {
            console.log("delete",res.status)
            if (res.status==200){
                setIsModalOpen(false);  // Close the modal after deleting
            }
            console.log("UserDeleted");
        }).catch((error) => {
            console.log(error)
        })
    }

    const toggleForDeleteUser = () => {
        setIsModalOpen(!isModalOpen)
    }

    if (user.length < 0) {
        return <h1>no user found</h1>;
    } else {
        return (
            <div className="mt-5">
                {isLoading && <Loader/>}
                {error && <p>Error: {error}</p>}
                <table className="table table-striped center">
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
                                <td className="actions">
                                    <Link to={`/edit-user/${user.id}`}>
                                        <i className="fas fa-pencil-alt" aria-hidden="true"></i>
                                    </Link>
                                    <Link to={`/user/${user.id}`}>
                                        <i className="fas fa-eye" aria-hidden="true"></i>
                                    </Link>
                                    <i className="fas fa-trash-alt" style={{cursor: "pointer"}} onClick={() => {
                                        setSelectedUserId(user.id);
                                        toggleForDeleteUser()
                                    }} aria-hidden="true"></i>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                <Modal show={isModalOpen} onHide={toggleForDeleteUser}>
                    <Modal.Header>
                        <Modal.Title>
                            <p>Modal</p>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            <p>Are You Sure Want To Delete</p>
                    </Modal.Body>
                    <Modal.Footer>
                                <Button variant="secondary" onClick={()=>toggleForDeleteUser()}>Cancel</Button>
                                <Button variant="secondary" onClick={()=>handleDelete()}>Ok</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}

export default ShowUser
