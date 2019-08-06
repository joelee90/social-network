import * as io from 'socket.io-client';
import { chatMessages, chatMessage } from './actions';
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
        'chatMessage',
        msg => store.dispatch(
            chatMessage(msg)
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
