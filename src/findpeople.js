import React, { useState, useEffect } from 'react';
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
                // console.log("searchNew.data", searchNew.data);
                setUser(searchNew.data);
            })();
        }
    }, [val]);


    return (
        <div>
            <h1>Find People</h1>

            <input
                style= {{margin: "20px"}}
                type="text" name="searchbar"
                placeholder="find your mates"
                onChange={ e => setVal(e.target.value)}
                defaultValue = {val}
            />

            {user && user.map(
                val => (
                    <div className="newpeople" key={val.id}>
                        <div className="newpeoplein" >
                            <img src = {val.url} />
                            <h1> {val.firstname} {val.lastname} </h1>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}



// {user.map (
//     user => {
//         <div key={user.id}>
//             {user.firstname}
//             {user.lastname}
//         </div>
//     }
// )}

// useEffect - ajax req when component mounts.
// 1 recent users - once when component mounts - pass empty array, run whenever val changes and set the new value
// when get new users, calls setUsers. only when the textfield value changes.
// 2 search
//
// use together
