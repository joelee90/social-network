const express = require('express');
const app = express();
const compression = require('compression');
const db = require("./utils/db");
const bc = require("./utils/bc");
const cookieSession = require("cookie-session");
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
const s3 = require('./s3');
const config = require('./config');
const moment = require("moment");
const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: 'localhost:8080' });
const csurf = require('csurf');

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(compression());
app.use(express.static('./public'));
app.use(require("body-parser").json());

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());

app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/welcome');
});

app.get('/welcome', (req,res) => {
    if(req.session.userId) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.post('/registration', async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        let hash = await bc.hashPassword(password);
        let id = await db.addNewUser(firstname, lastname, email, hash);
        req.session.userId = id.rows[0].id;
        res.json({ success : true });
    } catch (err) {
        res.json({ success : false });
        console.log("err in POST /registration: ", err);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    db.checkEmail(email)
        .then(val => {
            if(val.rowCount == 0) {
                res.json({ login:false });
            }
            bc.checkPassword(password, val.rows[0].password)
                .then(match => {
                    if(match) {
                        req.session.userId = val.rows[0].id;
                        res.json({ login:true });
                    } else {
                        res.json({ login:false });
                    }
                });
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/user', async (req, res) => {
    let user = await db.getUserById(req.session.userId);
    user = user.rows[0];
    if(!user.url){
        user.url = '/default.png';
    }
    res.json({user});
});

app.post('/upload', uploader.single('file'), s3.upload, function(req, res) {
    if(req.file) {
        let url = config.s3Url + req.file.filename;
        db.addUserImage(
            url,
            req.session.userId
        ).then(data => {
            res.json({
                data: data.rows[0].url,
                success : true
            });
        })
            .catch(function(err) {
                console.log('err in post:',err);});
    } else {
        res.json({
            success : false });
    }
});

app.post('/bio', async (req,res) => {
    const bio = req.body.bio;
    try {
        await db.updateUserBio(bio, req.session.userId);
        res.json({ bio });
    } catch (err) {
        console.log("err in app post /user", err);
    }
});

app.get("/api/user/:id", async (req, res) => {
    try {
        const {id} = req.params;
        if(id == req.session.userId) {
            res.json({sameUser : true});
            throw new Error('current user');
        }
        const user = await db.getUserById(req.params.id);
        res.json(user.rows[0]);
    } catch (err) {
        console.log("err in get api/user/id/",err);
    }
});

app.get('/api/users', async (req, res) => {
    const newUsers = await db.getNewUsers();
    res.json(newUsers.rows);
});

app.get('/search/:val.json', async (req, res) => {
    const searchUsers = await db.getMatching(req.params.val);
    res.json(searchUsers.rows);
});

app.get('/users/:val.json', async (req, res) => {
    try {
        const sender = req.session.userId;
        const receiver = req.params.val;
        const checkFriend = await db.checkFriendship(sender, receiver);

        if(checkFriend.rows == 0) {
            res.json({
                buttonText :"Add Friend"
            });
        } else if(checkFriend.rows[0].accepted) {
            res.json({
                buttonText :"Remove Friend"
            });
        } else if(checkFriend.rows[0].sender_id == receiver) {
            res.json({
                buttonText :"Accept Friend"
            });
        } else {
            res.json({
                buttonText :"Cancel Friend"
            });
        }
    } catch (err) {
        console.log("err in get check friend", err);
    }
});

app.post('/users/:val.json', async (req, res) => {
    try {
        const sender = req.session.userId;
        const receiver = req.params.val;
        const buttonStatus = req.body.button;
        try {
            if(buttonStatus == "Add Friend") {
                const addFriend = await db.makeFriendRequest(sender, receiver);
                console.log("addFriend", addFriend);
                res.json({
                    buttonText : "Cancel Friend"
                });
            } else if(buttonStatus == "Accept Friend") {
                const acceptFriendRequest = await db.acceptFriendRequest(sender, receiver);
                console.log("acceptFriendRequest", acceptFriendRequest);
                res.json({
                    buttonText : "Remove Friend"
                });
            } else if(buttonStatus == "Cancel Friend" || buttonStatus == "Remove Friend") {
                const cancelFriend = await db.cancelFriend(sender, receiver);
                console.log("cancelFriend", cancelFriend);
                res.json({
                    buttonText : "Add Friend"
                });
            }
        } catch (err) {
            console.log("err in post /users/:val.json", err);
        }
    } catch (err) {
        console.log("err", err);
    }
});

app.get('/friendstree', async (req, res) => {
    try {
        const {rows} = await db.getUsersdb(req.session.userId);
        res.json(rows);
    } catch(err) {
        console.log("err in get friends", err);
    }
});

app.get('*', function(req, res) {
    if(!req.session.userId) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

let wallPost = [];

io.on('connection', async function(socket) {
    console.log(`socket with the id ${socket.id} is now connected`);

    let userId = socket.request.session.userId;
    
    let socketId = socket.id;

    if (!userId) {
        return socket.disconnect(true);
    }

    const latestMsg = await db.getLastTenMessages();

    latestMsg.rows.forEach(val => {
        val.created_at = moment(val.created_at, moment.ISO_8601).fromNow();
    });
    io.emit('chatMessages', latestMsg.rows.reverse());

    socket.on('Send chat', async (data) => {
        let newMsg = await db.saveMessages(userId, data);
        let user = await db.getUserById(userId);

        newMsg.rows[0].created_at = moment(
            newMsg.rows[0].created_at,
            moment.ISO_8601
        ).fromNow();

        const result = {...newMsg.rows[0], ...user.rows[0]};

        io.emit('newChatMessage', result);
    });

    wallPost.push({
        userId,
        socketId: socket.id
    });

    socket.on('allwallpost', async (id) => {
        id = id || userId;
        const getWallPost = await db.getWallPost(id);
        getWallPost.rows.forEach(wallpost => {
            wallpost.created_at = moment(wallpost.created_at, moment.ISO_8601).fromNow();
        });
        let unique = wallPost.filter(
            val => val.userId == id
        );
        io.emit('oldWallPost', getWallPost.rows.reverse());
    });

    socket.on('wallpost', async (val, id) => {
        console.log(`post from ${userId} to ${id.receiver_id}: ${val}`);

        let newPost = await db.addWallPost(userId, id.receiver_id, val);
        let userWall = await db.getUserById(userId);

        newPost.rows[0].created_at = moment(
            newPost.rows[0].created_at,
            moment.ISO_8601
        ).fromNow();

        const wallResult = {...newPost.rows[0], ...userWall.rows[0]};
        io.emit('newWallPost', wallResult);
    });

    socket.on('disconnect', function() {
        console.log(`socket with the id ${socket.id} is now disconnected`);
    });
});

server.listen(8080, function() {
    console.log("server on!");
});
