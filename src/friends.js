import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, acceptFriend, endFriend } from './actions';

export default function Friends () {
    const dispatch = useDispatch();

    const wannabes = useSelector(
        state => state.users && state.users.filter(
            user => user.accepted == false
        )
    );
    console.log("wannabes from friends", wannabes);
    //accepted friends filtered out(true 제외)

    const friends = useSelector(
        state => state.users && state.users.filter (
            user => user.accepted == true
        ));
    console.log("friends from friends", friends);
    //unaccepted friends filtered out(false 제외)

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
            <h1 style={{margin: "10px"}}>Your Mates are here!</h1>
            <div className="people">
                <div className="wannabes">
                    <h1>Mate Wannabes</h1>
                    {wannabes && wannabes.map(
                        val => (
                            <div className="wannabesindi" key={val.id}>
                                <Link to = {`/user/${val.id}`}><img src = {val.url}/></Link>
                                <div>
                                    <button className="addfriend-btn" onClick={e => dispatch(acceptFriend(val.id))}>Accept Friend</button>
                                </div>
                                <h1> {val.firstname} {val.lastname} </h1>

                            </div>
                        )
                    )}
                </div>
                <div className="friends">
                    <h1>Your Mates</h1>
                    {friends && friends.map(
                        val => (
                            <div className="friendsindi" key={val.id}>
                                <Link to = {`/user/${val.id}`}><img src = {val.url}/></Link>
                                <div>
                                    <button className="addfriend-btn" onClick={e => dispatch(endFriend(val.id))}>Remove Friend</button>
                                </div>
                                <h1> {val.firstname} {val.lastname} </h1>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
