//server

const server = require('http').Server(app);
//create new server passing this server to.
const io = require('socket.io')(server, { origins: 'localhost:8080' });
//origin - space seperated list
//heroku -  { origins: 'localhost:8080 mysocialnetwork.herokuapp.com:*' }

server.listen(8080, function() {
    console.log("What's Poppin 😎");
});
//based on events

let mySocketId;
io.on('connection', socket => {
    console.log(`A socket with the id ${socket.id} just connected.`);

    console.log(
        socket.request.headers
    ); //cookie that came, to know the id of the user.

    socket.emit('greeting', {
        message: 'hi there!'
    });

    io.sockets.emit('newPlayer', {});

    if(mySocketId) {
        io.sockets.sockets[mySocketId].emit('targetedMessage');
        //private msg, if u know socket id, way to send a specific
        //knowing the userId
    }

    //initial http req that establish connection - determin who the user is

    socket.on('funky', payload => console.log(payload));

    socket.on('disconnect', () => {
        console.log(`A socket with the id ${socket.id} just disconnected.`);
    });
});
//predefined event
//send msg or listen to msg
//io.socket.emit - to everyone
//socket - to a certain connect
// on - listen for event that will be omited.
// emit - when want to make event happen.
// private chat: find socket that belongs to the user.
