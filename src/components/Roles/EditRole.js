import React, {useEffect, useState} from 'react'
import {getRoleById, updateRoleById} from "../../api/Roles.api";
import {useParams} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import {Button} from "@material-ui/core";

function EditRole() {
    const [roleName, setRoleName] = useState("");
    const {id} = useParams();

    useEffect(() => {
        console.log("EditPage",id);
        getRoleById(id).then((res)=> {
            if (res.status=200){
                setRoleName(res.data.rollName)
            }
        }).catch((error)=>{
            console.log(error);
        })
    }, []);

    function handleUpdateUSer(e) {
       const role={
            rollName:roleName
        }
        e.preventDefault()
        updateRoleById(id,role).then((res)=>{
            if (res.status==200) {
                alert("Role Updated Successfully")
            }
        }).catch((error)=>{
            alert(error.getMessage)
        })
    }

    return (
        <div className="mt-5">
            <form className="user-form" onSubmit={handleUpdateUSer}>
                <div className="mb-3">
                    <label className="form-label">RoleName</label>
                    <input type="text" id="roleName" className="form-control" name="roleName" value={roleName} onChange={(e)=>setRoleName(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary submit-btn">Submit</button>
            </form>

        </div>
    )
}

export default EditRole
