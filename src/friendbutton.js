import React, { useState, useEffect } from 'react';
import axios from './axios';

export default function FriendButton (props) {
    const [button, setButton] = useState();
    console.log("button", button);

    useEffect(() => {
        console.log("mounted!");
        (async () => {
            try {
                const {data} = await axios.get(`/users/${props.OtherProfileId}.json`);
                // console.log("data", data);
                setButton(data.buttonText);
            } catch(err) {
                console.log("err in friend check", err);
            }
        })();
    }, []);

    async function submit() {
        console.log("submit btn!!");
        try {
            const {data} = await axios.post(`/users/${props.OtherProfileId}.json`,
                { button });
            setButton(data.buttonText);
        } catch (err) {
            console.log("err in submit btn", err);
        }
    }

    return (
        <div>
            <button className="addfriend-btn" onClick={submit}>{button}</button>
        </div>
    );
}
