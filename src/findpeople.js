import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from './axios';

export default function FindPeople ({ id }) {
    const [user, setUser] = useState();
    const [val, setVal] = useState();
    //value of the text field.
    // console.log("user", user);
    // console.log("val", val);

    useEffect(() => {
        if(!val) {
            (async () => {
                // console.log("val", val);
                const list = await axios.get(`/api/users`);
                // console.log('list', list.data);
                setUser(list.data);
            })();
        } else {
            (async () => {
                const searchNew = await axios.get(`/search/${val}.json`);
                console.log("searchNew.data", searchNew.data);
                setUser(searchNew.data);
            })();
        }
    }, [val]);

    return (
        <div className = "searched">
            <h1>Find your mates :)</h1>

            <input
                className = "inputforsearch"
                style= {{margin: "20px", width: "500px"}}
                type="text" name="searchbar"
                placeholder="who will be your next mate?"
                onChange={ e => setVal(e.target.value)}
                defaultValue = {val}
            />

            {user && user.map(
                val => (
                    <div className="newpeople" key={val.id}>
                        <div className="newpeoplein" >
                            <Link to = {`/user/${val.id}`}><img src = {val.url}/></Link>

                            <h1> {val.firstname} {val.lastname} </h1>
                        </div>
                    </div>
                )
            )}

        </div>
    );
}
