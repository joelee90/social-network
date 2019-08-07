import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from './axios';

export default function Wall (props) {

    // const wallPosts = useSelector(
    //     state => state && state.
    // );
    // console.log("wallPosts wall.js", wallPosts);


    useEffect(() => {
        console.log("mounted!");
        // async () => {
        // const list =  await axios.get(`/userwall/${props.OtherId}`);
        const list = axios.get(`/userwall/${props.OtherId}`);
        console.log("data get", list);
        // };
    }, []);

    async function keyCheck (e) {

        if(e.key === "Enter") {
            e.preventDefault();
            console.log(e.target.value);

            try {
                const wall = await axios.post(`/userwall/${props.OtherId}`, {
                    wall: e.target.value
                });
                console.log("wall post", wall);
                // e.target.value = "";
            } catch (err) {
                console.log("err in keycheck", err);
            }
        }
    }


    return (
        <div>
            <h1>This is wall</h1>


            <textarea
                placeholder = "Leave a message"
                onKeyDown = { keyCheck }
                style ={{width: "40vw", height: "8vh"}}
            />
        </div>
    );



}
// {wallPosts && wallPosts.map (
//     val => (
//         <div className="wallpost" key={val.id}>
//             {val.wall}
//         </div>
//     )
// )}
