import React from 'react';

export default function ProfilePic ({ url, firstname, lastname, onClick }) {
    // url = url || "/images/default.png";
    return (
        <img src={url}
            alt={`${firstname} ${lastname}`} onClick={ onClick } width = "150px"/>
    );
}

//parent passing function to child, one way direction of data flowing.
//profilepic - presentation component
