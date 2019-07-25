import React from 'react';

export default function({ url, firstname, lastname, onClick }) {
    return (
        <img src={url} alt={`${firstname} ${lastname}`} onClick={ onClick } width = "200px" />
    );
}

//parent passing function to child, one way direction of data flowing.
//profilepic - presentation component
