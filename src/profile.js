import React from "react";
import ProfilePic from "./profilepic";
import Bioeditor from "./bioeditor";

export default function Profile(props) {
    return (
        <div>
        
            {props.profilepic}

            <p>
                {props.firstname} {props.lastname}
            </p>

            {props.bioeditor}

        </div>
    );
}
