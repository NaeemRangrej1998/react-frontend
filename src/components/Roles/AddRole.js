import React, {useState} from 'react'
import {saveRole} from "../../api/Roles.api";
import role from "./Role";

function AddRole() {
    const [roleName, setRoleName] = useState("");

    function handleRole(event) {
        event.preventDefault()
        const rollName={
            rollName: roleName
        }
        saveRole(rollName).then((res) => {
            if (res.status == 200) {
                console.log("Role Added SuccessFully")
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className="mt-5">
            <form className="user-form" onSubmit={handleRole}>
                <div className="mb-3">
                    <label className="form-label">RoleName</label>
                    <input type="text" className="form-control" id="roleId" name="roleId" value={roleName}
                           onChange={(e) => {
                               setRoleName(e.target.value)
                           }}/>
                </div>
                <button type="submit" className="btn btn-primary col-sm-auto">Add Role</button>
            </form>
        </div>
    )
}

export default AddRole
