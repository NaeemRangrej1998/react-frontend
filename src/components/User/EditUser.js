import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
// import {Link, withRouter} from "react-router-dom";
import '../../css/User.css';
import Loader from '../../commons/Loader';
import {getUserById, saveUser, updateUserById} from "../../api/use.api";
import {Slide, toast} from "react-toastify";

function EditUser({props}) {
    const history = useHistory();
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [user, setUser] = useState({});
    const [role] = useState([
        {value: '1', label: 'ADMIN'},
        {value: '2', label: 'USER'}
    ]);
    const [selectedRole, setSelectedRole] = useState('');

    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        setIsLoading(true);
        getUserById(id)
            .then((res) => {
                if (res && res.status == 200) {
                    setUser(res.data);
                    setSelectedRole(res.data.roleId); // Set role if it's already present in user data
                    setIsLoading(false)
                }
                else {
                    throw res
                }

            })
            .catch((error) => {
                toast.error(error.message, {
                    position: "top-center",
                    transition: Slide
                })
                setIsLoading(false);
                setIsLoading(false)
            });
    };

    const handleInput = (event) => {
        const {name, value} = event.target;
        setUser({...user, [name]: value});
    };

    const handleRoleChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedRole(selectedValue); // Update selected role
        setUser({...user, roleId: selectedValue}); // Update roleId in user state
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            await updateUserById(user, id).then((res) => {
                if (res && res.status == 200) {
                    toast.success(" User Edited Successfully!", {
                        position: "top-center",
                        transition: Slide
                    })
                    history.push('/showUser');
                    setIsLoading(false);
                } else {
                    throw res
                }
            }).catch((error) => {
                toast.error(error.message, {
                    position: "top-center",
                    transition: Slide
                })
                setIsLoading(false);
            });
        } catch (error) {
            toast.error(error.message, {
                position: "top-center",
                transition: Slide
            })
            setIsLoading(false);
        }
    };

    return (
        <div className='user-form' style={{position: "relative"}}>
            <div className='heading'>
                {isLoading && <Loader/>}
                <p>Edit User Form</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">FirstName</label>
                    <input type="text" className="form-control" id="firstName" name="firstName"
                           value={user.firstName || ""}
                           onChange={handleInput}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">LastName</label>
                    <input type="text" className="form-control" id="lastName" name="lastName"
                           value={user.lastName || ""}
                           onChange={handleInput}/>
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={user.email || ""}
                           onChange={handleInput}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="roleId" className="form-label">Role</label>
                    <select className="form-control" id="roleId" name="roleId" value={selectedRole}
                            onChange={handleRoleChange}>
                        <option value="">Select Role</option>
                        {role.map((r) => (
                            <option key={r.value} value={r.value}>
                                {r.label}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary submit-btn">Edit</button>
            </form>
        </div>
    );
}

export default EditUser;
