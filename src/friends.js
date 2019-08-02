import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, acceptFriend, endFriend } from './actions';
import FriendButton from "./friendbutton";

export default function Friends () {
    const dispatch = useDispatch();

    const wannabes = useSelector(
        state => state.users && state.users.filter(
            user => user.accepted == false
        )
    );
    console.log("wannabes from friends", wannabes);

    const friends = useSelector(
        state => state.users && state.users.filter (
            user => user.accepted == true
        ));
    console.log("friends from friends", friends);

    useEffect(
        () => {
            dispatch(getUsers());
        },[]
    );

    if(!wannabes && !friends) {
        return null;
    }

    return (
        <div>
            <h1 style={{color:"blue"}}>Your Mates are here!</h1>
            <div className="people">
                <div className="wannabes">
                    <h1 style={{color:"blue"}}>Future mates!</h1>
                    {wannabes && wannabes.map(
                        val => (
                            <div key={val.id}>
                                <Link to = {`/user/${val.id}`}><img src = {val.url}/></Link>
                                <h1> {val.firstname} {val.lastname} </h1>
                                <FriendButton OtherProfileId={val.id}/>
                            </div>
                        )
                    )}
                </div>
                <div className="friends">
                    <h1 style={{color:"blue"}}>Mates!</h1>
                    {friends && friends.map(
                        val => (
                            <div key={val.id}>
                                <Link to = {`/user/${val.id}`}><img src = {val.url}/></Link>
                                <h1> {val.firstname} {val.lastname} </h1>
                                <FriendButton OtherProfileId={val.id}/>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

// const users = useSelector(state => state.users);
// console.log("users from friends", users);
// <div className="allusers">
//     {users && users.map(
//         val => (
//             <div key={val.id}>
//                 <Link to = {`/user/${val.id}`}><img src = {val.url}/></Link>
//                 <h1> {val.firstname} {val.lastname} </h1>
//             </div>
//         )
//     )}
// </div>
