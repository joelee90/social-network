import React, { useEffect, useRef } from 'react';
import { socket } from './socket';
import { useSelector } from 'react-redux';

export default function Chat() {

    const chatMessages = useSelector(
        state => state && state.chatMessages
    );
    console.log("last 10 messages", chatMessages);
    const newMessages = useSelector(
        state => state && state.chatMessages
    );
    console.log("newMessages", newMessages);

    const elemRef = useRef();

    useEffect(() => {
        console.log("chat hooks mounted");
        console.log("elemRef", elemRef);
        console.log("scroll top: ", elemRef.current.scrollTop);
        console.log("scroll height: ", elemRef.current.scrollHeight);
        console.log("client height: ", elemRef.current.clientHeight);
        elemRef.current.scrollTop = elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [newMessages]);
    //auto scroll down when page loads.

    const keyCheck = (e) => {
        console.log("e.target.val", e.target.value);
        console.log("e.key", e.key);
        if(e.key === "Enter") {
            console.log("Enter pressed!");
            e.preventDefault();
            socket.emit('Send chat', e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div className = "chat-body">
            <div className = "chat">
                <h1>Chat room</h1>
                <div className="chat-container" ref = { elemRef } >
                    {chatMessages && chatMessages.map(
                        val => (
                            <div key={val.id}>
                                {val.firstname}
                                {val.lastname}
                                <img style={{width: '100px'}} src = {val.url}/>
                                {val.user_id}
                                {val.message}
                            </div>
                        )
                    )}
                    <textarea
                        placeholder = "Add your message here"
                        onKeyDown = { keyCheck }
                    >
                    </textarea>
                </div>
            </div>
        </div>
    );
}

// <React.Fragment>
// </React.Fragment>

//ref - manually change the DOM,
