import * as io from 'socket.io-client';
// console.log('yo');
const socket = io.connect();

socket.on(
    'greeting',
    payload => {
        console.log(payload);
        socket.emit('nice', {
            chicken: 'funky'
        });
    }
);

socket.on('newPlayer', () => console.log('New Player'));
