import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from './axios';

export default function FindPeople () {
    const [user, setUser] = useState();
    const [val, setVal] = useState();

    useEffect(() => {
        if(!val) {
            (async () => {
                const list = await axios.get(`/api/users`);
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
            <img style = {{marginLeft: "30%"}} src= "/images/mate.png"/>
            <input
                className = "inputforsearch"
                style= {{margin: "30px", width: "500px"}}
                type="text" name="searchbar"
                placeholder="search for new mates"
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
