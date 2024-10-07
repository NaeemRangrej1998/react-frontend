import React, {useState} from 'react'
import {saveRole} from "../../api/Roles.api";
import role from "./Role";
import {useHistory} from "react-router-dom";
import Loader from "../../commons/Loader";
import {Slide, toast} from "react-toastify";

function AddRole() {
    const [roleName, setRoleName] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history=useHistory();

    function handleRole(event) {
        event.preventDefault()
        const rollName={rollName: roleName }
        setIsLoading(true)
        saveRole(rollName).then((res) => {
            if (res.status == 200) {
                toast.success("Role Added Successfully !",{
                    position:"top-center",
                    transition:Slide
                })
                setIsLoading(false)
                history.push('/showRole')
            }
            else {
                throw res;
            }
        }).catch((error) => {
            toast.error(error.message,{
                position:"top-center",
                transition:Slide
            })
            setIsLoading(false)
        })
    }

    return (
        <div className="mt-5">
            <form className="user-form" style={{ position: 'relative' }} onSubmit={handleRole}>
                    <div className='heading'>
                        {isLoading && <Loader />}
                    </div>{/* Loader will be centered within the form */}
                <div className="mb-3">
                    <label className="form-label">RoleName</label>
                    <input type="text" className="form-control" id="roleName" name="roleName" value={roleName}
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
