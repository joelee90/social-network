import React, { useEffect, useRef } from 'react';
import { socket } from './socket';
import { useSelector } from 'react-redux';
// import axios from './axios';

export default function Wall (props) {

    const wallPosts = useSelector(
        state => state && state.post
    );
    console.log("wallPosts wall.js", wallPosts);

    console.log("props", props.OtherId);
    let wallId = props.OtherId;

    const  elemRef = useRef();

    useEffect(() => {
        // console.log(elemRef);
        console.log("mounted!");
        socket.emit('allwallpost', wallId);
        elemRef.current.scrollTop = elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, []);

    useEffect(() => {
        console.log("mounted 2!");
        elemRef.current.scrollTop = elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [wallPosts]);

    const keyCheck = (e) => {
        if(e.key === "Enter") {
            e.preventDefault();
            console.log(e.target.value);
            socket.emit('wallpost', e.target.value, {
                receiver_id: wallId
            });
            e.target.value = "";
        }
    };

    return (
        <div>

            <img src= "/images/post.png"/>
            <br/>
            <textarea
                placeholder = "Leave a post for your mate"
                onKeyDown = { keyCheck }
                style ={{width: "40vw", height: "8vh"}}
                className="textarea"
            />
            <div className="wall-post-large" ref = { elemRef }>
                {wallPosts && wallPosts.map(
                    val => (
                        <div className="wallpost" key={val.id}>
                            <img style={{width: "50px"}} src={val.url}/>
                            < br/>
                            {val.firstname} {""}
                            {val.lastname} < br/>
                            <div style={{color: "#0099cc"}}>{val.wall}</div>
                            {val.created_at}
                        </div>
                    )
                )}
            </div>

        </div>

    );
}
