import React, {useState} from 'react'
// import {Link, withRouter} from "react-router-dom";
import {useHistory} from "react-router-dom/cjs/react-router-dom";
import '../css/User.css';
import Loader from '../commons/Loader';
import {saveUser} from "../api/use.api";

function CreateUser({props}) {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        roleId: ""
    })
    const [role] = useState([
        { value: '1', label: 'USER' },
        { value: '2', label: 'ADMIN' }
    ]);
    const [selectedRole, setSelectedRole] = useState('');
    const handelInput = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        console.log(name, value)
        setUser({...user, [name]: value});
    }

    const handleRoleChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedRole(selectedValue); // Update selected role
        setUser({ ...user, roleId: selectedValue }); // Update roleId in user state
    };
    const handelSubmit = async (event) => {
        event.preventDefault();
        console.log(user)
        try {
            setIsLoading(true);
            const response = await saveUser(user);

            if (response.ok) {
                console.log('Form submitted successfully!');
                setUser({firstName: "",lastName: "",email: "",password: "",roleId: ""})
               history.push('/showUser');
            } else {
                console.error('Form submission failed!');
            }

        } catch (error) {
            setError(error.message);
        } finally{
            setIsLoading(false);
        }
    }

    return (
        <div className='user-form'>
            <div className='heading'>
                {isLoading && <Loader/>}
                {error && <p>Error: {error}</p>}
                <p>User Form</p>
            </div>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">FirstName</label>
                    <input type="text" className="form-control" id="firstName" name="firstName" value={user.firstName}
                           onChange={handelInput}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">LastName</label>
                    <input type="text" className="form-control" id="lastName" name="lastName" value={user.lastName}
                           onChange={handelInput}/>
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={user.email}
                           onChange={handelInput}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={user.password}
                           onChange={handelInput}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="roleId" className="form-label">RoleName</label>
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
    )
}

export default CreateUser
