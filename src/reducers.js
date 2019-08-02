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
                        end: action.type == 'END_FRIEND'
                    };
                }
            )
        };
    }
    return state;
}
