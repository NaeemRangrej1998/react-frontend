import React, {useEffect, useState} from 'react'
import {getRoleById, updateRoleById} from "../../api/Roles.api";
import {useHistory, useParams} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import {Button} from "@material-ui/core";
import Loader from "../../commons/Loader";
import {Slide, toast} from "react-toastify";

function EditRole() {
    const [roleName, setRoleName] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {id} = useParams();
    const history=useHistory();

    useEffect(() => {
        setIsLoading(true)
        getRoleById(id).then((res)=> {
            if (res.status=200){
                setRoleName(res.data.rollName)
                setIsLoading(false)
            }else {
                throw res
            }
        }).catch((error)=>{
            toast.error(error.message,{
                position:"top-center",
                transition:Slide
            })
            setIsLoading(false)
        })
    }, []);

    function handleUpdateRole(e) {
        setIsLoading(true)
        const role={ rollName:roleName }
        e.preventDefault()
        updateRoleById(id,role).then((res)=>{
            if (res.status==200) {

                toast.success("Role Edited Successfully!",{
                    position:"top-center",
                    transition:Slide
                })
                setIsLoading(false)
                history.push('/showRole')
            }
        }).catch((error)=>{
            toast.error(error.message,{
                position:"top-center",
                transition:Slide
            })
            setIsLoading(false)
        })
    }

    return (
        <div className="mt-5">
            <form className="user-form" style={{position:"relative"}} onSubmit={handleUpdateRole}>
                <div>
                    {isLoading && <Loader/>}
                </div>
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
