import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from "react-router-dom/cjs/react-router-dom";
import '../css/User.css';
import Loader from '../commons/Loader';
import {getUserById, saveUser, updateUserById} from "../api/use.api";

function EditUser() {
    const history = useHistory();
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [user, setUser] = useState([]);

    useEffect(() => {
        getUser()
    }, []);

    const getUser = () => {
        getUserById(id)
            .then((item) => {
                setUser(item.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handelInput = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        console.log(name, value)
        setUser({...user, [name]: value});
    }

    const handelSubmit = async (event) => {
        event.preventDefault();
        console.log(user)
        try {
            setIsLoading(true);
            const response = await updateUserById(user, id);

            if (response.ok) {
                console.log('Form submitted successfully!');
                setUser({firstName: "", lastName: "", email: "", password: "", roleName: ""})
                history.push.pathname('/showUser');
            } else {
                console.error('Form submission failed!');
            }

        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className='user-form'>
            <div className='heading'>
                {isLoading && <Loader/>}
                {error && <p>Error: {error}</p>}
                <p>Edit User Form</p>
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
                    <label htmlFor="roleName" className="form-label">RoleName</label>
                    <input type="text" className="form-control" id="roleName" name="roleName" value={user.roleName}
                           onChange={handelInput}/>
                </div>
                <button type="submit" className="btn btn-primary submit-btn">Submit</button>
            </form>
        </div>
    )
}

export default EditUser
