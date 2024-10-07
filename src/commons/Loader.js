import React from 'react'
import "./commons.css";
import {Spinner} from "react-bootstrap";
export default function Loader() {
    return (
        <div className="modal-loader-form-sbm">
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    )
}