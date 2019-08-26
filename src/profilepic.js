import React from 'react';

export default function ProfilePic ({ url, firstname, lastname, onClick }) {
    return (
        <img src={url}
            alt={`${firstname} ${lastname}`} onClick={ onClick } width = "150px"/>
    );
}
