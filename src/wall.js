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
        console.log(elemRef);
        console.log("mounted!");
        socket.emit('allwallpost', wallId);
        // async () => {
        // const list =  await axios.get(`/userwall/${props.OtherId}`);
        // const list = axios.get(`/userwall/${props.OtherId}`);
        // console.log("data get", list);
        // };
        elemRef.current.scrollTop = elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, []);

    useEffect(() => {
        console.log("mountedee!");
        // async () => {
        // const list =  await axios.get(`/userwall/${props.OtherId}`);
        // const list = axios.get(`/userwall/${props.OtherId}`);
        // console.log("data get", list);
        // };
        elemRef.current.scrollTop = elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [wallPosts]);

    const keyCheck = (e) => {
        if(e.key === "Enter") {
            e.preventDefault();
            console.log(e.target.value);
            socket.emit('wallpost', e.target.value, {
                receiver_id: wallId
                // wallOwner: 23
            });
            e.target.value = "";
        }
    };

    return (
        <div>
            <h2>Leave a post</h2>
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
                            <div>{val.wall}</div>
                            {val.created_at}
                        </div>
                    )
                )}
                
            </div>
        </div>
    );
}


// try {
//     const wall = await axios.post(`/userwall/${props.OtherId}`, {
//         wall: e.target.value
//     });
//     console.log("wall post", wall);
//     // e.target.value = "";
// } catch (err) {
//     console.log("err in keycheck", err);
// }
