import React, {useState} from 'react'
// import {Link, withRouter} from "react-router-dom";
import {useHistory} from "react-router-dom";
import '../../css/User.css';
import Loader from '../../commons/Loader';
import {saveUser} from "../../api/use.api";
import {Slide, toast} from "react-toastify";

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
        {value: '1', label: 'ADMIN'},
        {value: '2', label: 'USER'}
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
        setUser({...user, roleId: selectedValue}); // Update roleId in user state
    };
    const handelSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            await saveUser(user).then(res => {
                if (res.status && res.status == 200) {
                    setIsLoading(false);
                    toast.success("UserAdded Successfully!", {
                        position: "top-center",
                        transition: Slide
                    })
                    history.push('/showUser');
                }
                else {
                    console.log("first",error);
                    toast.error(res.data.error, {
                        position: "top-center",
                        transition: Slide
                    })
                }
            })
         } catch (error) {
            console.log("second",error);
            toast.error(error.response.data.error, {
                position: "top-center",
                transition: Slide
            })
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='user-form' style={{position: 'relative'}}> {/* Add relative positioning */}
            <div className='heading'>
                {isLoading && <Loader/>} {/* Loader will be centered within the form */}
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
                <button type="submit" className="btn btn-primary submit-btn">Submit</button>
            </form>
        </div>
    )
}

export default CreateUser
