import axios from './axios';

export async function getUsers() {
    console.log("action!!");
    const {data} = await axios.get('/friendstree');
    console.log("data from action", data);
    return {
        type: "GET_USERS",
        users: data
    };
}

export async function acceptFriend (id) {
    console.log("accept action!");
    const {data} = await axios.post(`/users/${id}.json`,
        {button: "Accept Friend"}
    );
    console.log("data accept friend", data);
    return {
        type: "ACCEPT_FRIEND",
        id
    };
}

export async function endFriend (id) {
    console.log("end action!");
    const {data} = await axios.post(`/users/${id}.json`,
        {button: "Remove Friend"}
    );
    console.log("data end friend", data);
    return {
        type: "END_FRIEND",
        id
    };
}