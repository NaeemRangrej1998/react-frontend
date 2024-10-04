import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {getRoleById} from "../../api/Roles.api";

function Role() {
    const [roleName, setRoleName] = useState();
    const {id}=useParams();
    useEffect(() => {
        getRoleById(id).then((res)=>{
            if (res.status==200) {
                setRoleName(res.data.rollName)
            }
        }).catch((error)=>{
            alert(error)
        })
    }, []);

    return (
        <div className="mt-5">
            <form className="user-form">
                <div className="mb-3">
                    <label className="form-label">RoleName</label>
                    <input type="text" className="form-control" id="roleName" name="roleName" value={roleName}/>
                </div>
                <button className="btn btn-primary submit-btn">Close</button>
            </form>
        </div>
    )
}

export default Role
