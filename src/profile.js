import React from "react";
import ProfilePic from "./profilepic";
import Bioeditor from "./bioeditor";

export default function Profile(props) {
    return (
        <div className="bioeditor-container">

            <div className="propic"> {props.profilepic} </div>

            <div className="nameandbio">
                <h2> {props.firstname} {props.lastname} </h2>
                <div className="bioedit"> {props.bioeditor} </div>
            </div>
            
        </div>
    );
}
