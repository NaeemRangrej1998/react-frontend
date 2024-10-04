import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
// import {Link, withRouter} from "react-router-dom";
import '../../css/User.css';
import Loader from '../../commons/Loader';
import { getUserById, saveUser, updateUserById } from "../../api/use.api";

function EditUser({props}) {
    const history = useHistory();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [user, setUser] = useState({});
    const [role] = useState([
        { value: '1', label: 'ADMIN' },
        { value: '2', label: 'USER' }
    ]);
    const [selectedRole, setSelectedRole] = useState('');

    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        getUserById(id)
            .then((item) => {
                console.log("item", item);
                setUser(item.data);
                setSelectedRole(item.data.roleId); // Set role if it's already present in user data
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleInput = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handleRoleChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedRole(selectedValue); // Update selected role
        setUser({ ...user, roleId: selectedValue }); // Update roleId in user state
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            await updateUserById(user, id).then((res)=>{
                console.log('Form submitted successfully!');
                setIsLoading(false);
                // setUser({ firstName: "", lastName: "", email: "", roleId: "" });
                history.push('/showUser');
            }).catch((error)=>{
                setError(error.message);
            });
        } catch (error) {
            setError(error.message);
        } finally {
        }
    };

    return (
        <div className='user-form'>
            <div className='heading'>
                {isLoading && <Loader />}
                {error && <p>Error: {error}</p>}
                <p>Edit User Form</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">FirstName</label>
                    <input type="text" className="form-control" id="firstName" name="firstName" value={user.firstName || ""}
                           onChange={handleInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">LastName</label>
                    <input type="text" className="form-control" id="lastName" name="lastName" value={user.lastName || ""}
                           onChange={handleInput} />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={user.email || ""}
                           onChange={handleInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="roleId" className="form-label">Role</label>
                    <select className="form-control" id="roleId" name="roleId" value={selectedRole} onChange={handleRoleChange}>
                        <option value="">Select Role</option>
                        {role.map((r) => (
                            <option key={r.value} value={r.value}>
                                {r.label}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary submit-btn">Submit</button>
            </form>
        </div>
    );
}

export default EditUser;
