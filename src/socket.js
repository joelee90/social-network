import * as io from 'socket.io-client';
import { chatMessages, newChatMessage } from './actions';
// console.log('yo');

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();
    }

    socket.on(
        'chatMessages',
        msg =>
            store.dispatch(
                chatMessages(msg)
            )
    );

    socket.on(
        'newChatMessage',
        msg => store.dispatch(
            newChatMessage(msg)
        )
    );

};

// socket.on('newPlayer', () => console.log('New Player'));
//
// socket.on(
//     'greeting',
//     payload => {
//         console.log(payload);
//         socket.emit('nice', {
//             chicken: 'funky'
//         });
//     }
// );
