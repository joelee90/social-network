import React, { useEffect, useRef } from 'react';
import { socket } from './socket';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Chat() {

    const chatMessages = useSelector(
        state => state && state.message
    );

    const elemRef = useRef();

    useEffect(() => {
        elemRef.current.scrollTop = elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);

    const keyCheck = (e) => {
        if(e.key === "Enter") {
            e.preventDefault();
            socket.emit('Send chat', e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div className = "chat-body">
            <div className = "chat">
                <img className="liveimg" src= "/images/live.png" />
                <div className="chat-container" ref = { elemRef } >
                    {chatMessages && chatMessages.map(
                        val => (
                            <div className="chat-in" key={val.id}>
                                <div className="chat-person">
                                    <img src = {val.url}/>
                                    {val.firstname}
                                    < br/>
                                    <span className="time">{val.created_at}</span>
                                </div>
                                <span className="chat-msg">{val.message}</span>
                            </div>
                        )
                    )}
                </div>
                <textarea
                    placeholder = "Add your message here"
                    onKeyDown = { keyCheck }
                    style ={{width: "40vw", height: "8vh"}}
                    className = "textarea"
                >
                </textarea>
            </div>
        </div>
    );
}
