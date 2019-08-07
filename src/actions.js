import axios from './axios';

export async function getUsers() {
    // console.log("action!!");
    const {data} = await axios.get('/friendstree');
    // console.log("data from action", data);
    return {
        type: "GET_USERS",
        users: data
    };
}

export async function acceptFriend (id) {
    // console.log("accept action!");
    const {data} = await axios.post(`/users/${id}.json`,
        {button: "Accept Friend"}
    );
    // console.log("data accept friend", data);
    return {
        type: "ACCEPT_FRIEND",
        id
    };
}

export async function endFriend (id) {
    // console.log("end action!");
    const {data} = await axios.post(`/users/${id}.json`,
        {button: "Remove Friend"}
    );
    // console.log("data end friend", data);
    return {
        type: "END_FRIEND",
        id
    };
}

export function chatMessages (data) {
    // console.log("10 chatMessages", data);
    return {
        type: "CHAT_MESSAGES",
        message: data
    };
}

export function newChatMessage (data) {
    // console.log("newChatMessage", data);
    return {
        type: "NEW_CHAT_MESSAGE",
        message: data
    };
}


export function newWallPost (data) {
    console.log("newWallPost", data);
    return {
        type: "NEW_WALL_POST",
        post: data
    };
}

export function oldWallPost (data) {
    console.log("oldWallPost", data);
    return {
        type: "OLD_WALL_POST",
        post: data
    };
}
