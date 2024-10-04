import React, { useEffect, useState } from "react";
import '../../css/User.css';
import {Link, useHistory, withRouter} from "react-router-dom";
import { useParams } from "react-router-dom";
import {getUserById} from "../../api/use.api";
import Loader from "../../commons/Loader";
const User = () => {
    const [user, setUser] = useState([]);
    const { id } = useParams();
    const history=useHistory();
    useEffect(() => {
        getUser(id);
    }, []);

    const getUser = (id) => {
       getUserById(id)
            .then((item) => {
                setUser(item.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    function hadleCancleButton() {
    }

    function handleCancleButton() {
        history.push('/showUser')
    }

    return (
        <div className='user-form'>
            <form>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">FirstName</label>
                    <input type="text" className="form-control" id="firstName" name="firstName" value={user.firstName || ""}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">LastName</label>
                    <input type="text" className="form-control" id="lastName" name="lastName" value={user.lastName || ""}/>
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={user.email || ""}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={user.password || ""}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="roleId" className="form-label">Role</label>
                    <input type="roleId" className="form-control" id="roleId" name="roleId" value={user.roleId || ""}/>
                </div>
                <button className="btn btn-primary " onClick={handleCancleButton}>Cancle</button>
            </form>
        </div>
    );
};
export default withRouter(User);