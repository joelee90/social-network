import React from "react";
import ProfilePic from "./profilepic";
import Bioeditor from "./bioeditor";
import Wall from "./wall";

export default function Profile(props) {
    console.log("props in pro", props);
    return (

        <div className="myprofile">
            <div className="bioeditor-container-large">
                <div className="bioeditor-container">
                    <div className="propic"> {props.profilepic} </div>
                    <div className="nameandbio">
                        <h2> {props.firstname} {props.lastname} </h2>
                        <div className="bioedit"> {props.bioeditor} </div>
                    </div>
                </div>
            </div>
            <div className="wall-wall" ><Wall/></div>
        </div>
    );
}
