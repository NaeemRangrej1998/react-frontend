import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from "react-router-dom";
import {getRoleById} from "../../api/Roles.api";
import Loader from "../../commons/Loader";

function Role() {
    const [roleName, setRoleName] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {id}=useParams();
    const history=useHistory();
    useEffect(() => {
        setIsLoading(true)
        getRoleById(id).then((res)=>{
            if (res.status==200) {
                setRoleName(res.data.rollName)
                setIsLoading(false)
            }
        }).catch((error)=>{
            alert(error)
            setIsLoading(false)
        })
    }, []);

    function handleClose() {
        history.push('/showRole')
    }

    return (
        <div className="mt-5">
            <form className="user-form" style={{position:"relative"}}>
                <div className="mb-3">
                    <div>
                        {isLoading && <Loader/>}
                    </div>
                    <label className="form-label">RoleName</label>
                    <input type="text" className="form-control" id="roleName" name="roleName" value={roleName}/>
                </div>
                <button className="btn btn-primary submit-btn" onClick={handleClose}>Close</button>
            </form>
        </div>
    )
}

export default Role
