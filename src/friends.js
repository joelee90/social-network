import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, acceptFriend, endFriend } from './actions';

export default function Friends () {
    const dispatch = useDispatch();

    const wannabes = useSelector(
        state => state.users && state.users.filter(
            user => user.accepted == false && user.id == user.sender_id
        )
    );

    const friends = useSelector(
        state => state.users && state.users.filter (
            user => user.accepted == true
        ));

    const myPennding = useSelector(
        state => state.users && state.users.filter (
            user => user.accepted == false && user.id != user.sender_id
        ));

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
            <h1 style={{marginLeft: '600px'}} ><img src= "/images/people.png"/></h1>
            <div className="people">
                <div className="wannabes">
                    <img src= "/images/wana.png"/>
                    {wannabes && wannabes.map(
                        val => (
                            <div className="wannabesindi" key={val.id}>
                                <Link to = {`/user/${val.id}`}><img className="mateimg" src = {val.url}/></Link>
                                <div>
                                    <button className="addfriend-btn" onClick={e => dispatch(acceptFriend(val.id))}>Accept Friend</button>
                                </div>
                                <h1> {val.firstname} {val.lastname} </h1>
                            </div>
                        )
                    )}
                </div>

                <div className="friends">
                    <img src= "/images/matess.png"/>
                    {friends && friends.map(
                        val => (
                            <div className="friendsindi" key={val.id}>
                                <Link to = {`/user/${val.id}`}><img className="mateimg" src = {val.url}/></Link>
                                <div>
                                    <button className="addfriend-btn" onClick={e => dispatch(endFriend(val.id))}>Remove Friend</button>
                                </div>
                                <h1> {val.firstname} {val.lastname} </h1>
                            </div>
                        )
                    )}
                </div>

                <div className="pennding">
                    <img src= "/images/mywanna.png"/>
                    {myPennding && myPennding.map(
                        val => (
                            <div className="penndingindi" key={val.id}>
                                <Link to = {`/user/${val.id}`}><img className="mateimg" src = {val.url}/></Link>
                                <div>
                                    <button className="addfriend-btn" onClick={e => dispatch(endFriend(val.id))}>Cancel Friend Request</button>
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
