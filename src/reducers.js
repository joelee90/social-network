export default function(state = {}, action) {
    if(action.type == 'GET_USERS') {
        state = {
            ...state,
            users: action.users
        };
    }

    if(action.type == 'ACCEPT_FRIEND') {
        state = {
            ...state,
            users: state.users.map(
                val => {
                    if(val.id != action.id) {
                        return val;
                    }
                    return {
                        ...val,
                        accepted: true
                    };
                }
            )
        };
    }

    if(action.type == 'END_FRIEND') {
        state = {
            ...state,
            users: state.users.map(
                val => {
                    if(val.id != action.id) {
                        return val;
                    }
                    return {
                        val: null
                    };
                }
            )
        };
    }

    if(action.type == 'CHAT_MESSAGE') {
        console.log("CHAT_MESSAGE");
        return {
            ...state,
            chatMessages: [...state.chatMessages, action.message]
        };
    }

    if(action.type == 'CHAT_MESSAGES') {
        console.log("CHAT_MESSAGES");
        return {
            ...state,
            chatMessages: action.messages
        };
    }



    return state;
}
