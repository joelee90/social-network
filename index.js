const express = require('express');
const app = express();
const compression = require('compression');
const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: 'localhost:8080' });
const db = require("./utils/db");
const bc = require("./utils/bc");
const cookieSession = require("cookie-session");
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
const s3 = require('./s3');
const config = require('./config');
const moment = require("moment");
const csurf = require('csurf'); //use after the cookie

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

// ----------------------------- part9 -----------------------------
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
// ----------------------------- part9 -----------------------------

// app.use(
//     cookieSession({
//         secret: "react is here.",
//         maxAge: 1000 * 60 * 60 * 24 * 14
//     })
// );

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
// ----------------------------- part1 -----------------------------

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
        // console.log("id", id.rows[0].id);
        req.session.userId = id.rows[0].id;
        res.json({ success : true }); //cannot happen until above are done
    } catch (err) {
        res.json({ success : false });
        console.log("err in POST /registration: ", err);
    }
});
// ----------------------------- part1 -----------------------------
// ----------------------------- part2 -----------------------------
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
// ----------------------------- part2 ----------------------------
// ----------------------------- part3 -----------------------------
app.get('/user', async (req, res) => {
    let user = await db.getUserById(req.session.userId);
    user = user.rows[0];
    // console.log("user.url", user.url);
    if(!user.url){
        user.url = '/default.png';
    }
    // console.log("user", user);
    res.json({user});
}); // to see if user has image or not

app.post('/upload', uploader.single('file'), s3.upload, function(req, res) {
    if(req.file) {
        let url = config.s3Url + req.file.filename;
        // console.log("url", url);
        // console.log("req.session.userId", req.session.userId);
        db.addUserImage(
            url,
            req.session.userId
        ).then(data => {
            // console.log("data", data.rows[0].url);
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
// ----------------------------- part3 -----------------------------
// ----------------------------- part4 -----------------------------
app.post('/bio', async (req,res) => {
    const bio = req.body.bio;
    try {
        await db.updateUserBio(bio, req.session.userId);
        // console.log("bio", bio);
        res.json({ bio });
    } catch (err) {
        console.log("err in app post /user", err);
    }
});
// ----------------------------- part4 -----------------------------
// ----------------------------- part5 -----------------------------
app.get("/api/user/:id", async (req, res) => {
    // console.log("req.params", req.params);
    // console.log("req.params.id", req.params.id);
    try {
        const {id} = req.params;
        // console.log("id", id);
        if(id == req.session.userId) {
            res.json({sameUser : true});
            throw new Error('current user');
        }
        const user = await db.getUserById(req.params.id);
        // console.log("user", user);
        // console.log("user", user.rows[0]);
        res.json(user.rows[0]);
    } catch (err) {
        console.log("err in get api/user/id/",err);
    }
}); //"api/user/:id"
// ----------------------------- part5 -----------------------------
// ----------------------------- part6 -----------------------------
app.get('/api/users', async (req, res) => {
    const newUsers = await db.getNewUsers();
    // console.log("newUsers.rows", newUsers.rows);
    res.json(newUsers.rows);
});

app.get('/search/:val.json', async (req, res) => {
    const searchUsers = await db.getMatching(req.params.val);
    // console.log("searchUsers", searchUsers);
    res.json(searchUsers.rows);
});
// ----------------------------- part6 -----------------------------
// ----------------------------- part7 -----------------------------
//check the relationship between two people
app.get('/users/:val.json', async (req, res) => {
    // console.log("sender", sender);
    // console.log("receiver", receiver);
    // console.log("checkFriend", checkFriend);
    // console.log("checkFriend.rows[0].accepted", checkFriend.rows[0]);
    // console.log("checkFriend.rows[0].sender_id", checkFriend.rows[0].sender_id);
    // console.log("checkFriend.rows[0].accepted", checkFriend.rows[0].accepted);
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
        // console.log("sender post", sender);
        // console.log("req.params post", req.params);
        const buttonStatus = req.body.button;
        // console.log("req.body.button", req.body.button);
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
// ----------------------------- part7 -----------------------------
// ----------------------------- part8 -----------------------------
app.get('/friendstree', async (req, res) => {
    try {
        const {rows} = await db.getUsersdb(req.session.userId);
        // console.log("rows", rows);
        res.json(rows);
    } catch(err) {
        console.log("err in get friends", err);
    }
});
//rout to get the lis of friends and wannabes(query to get combined list)
// ----------------------------- part8 -----------------------------

app.get('*', function(req, res) {
    if(!req.session.userId) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
}); //if no cookie(not registered) redirect to /welcome

// ----------------------------- part9 -----------------------------

io.on('connection', async function(socket) {
    console.log(`socket with the id ${socket.id} is now connected`);

    // onLineUsers[socket.id] = socket.request.session.userId;
    //online user, check that id is on the list once. then emit event about user appearance.
    let userId = socket.request.session.userId;
    console.log("userId", userId);



    if (!userId) {
        return socket.disconnect(true);
    }

    const latestMsg = await db.getLastTenMessages();
    // console.log("latestMsg", latestMsg.rows);
    latestMsg.rows.forEach(val => {
        val.created_at = moment(val.created_at, moment.ISO_8601).fromNow();
    });
    io.emit('chatMessages', latestMsg.rows.reverse());

    socket.on('Send chat', async (data) => {
        let newMsg = await db.saveMessages(userId, data);
        let user = await db.getUserById(userId);
        // console.log("data from chat.js", data);
        // console.log("newMsg.rows", newMsg.rows);
        // console.log("user", user.rows);
        newMsg.rows[0].created_at = moment(
            newMsg.rows[0].created_at,
            moment.ISO_8601
        ).fromNow();

        const result = {...newMsg.rows[0], ...user.rows[0]};
        // console.log("results", result);
        io.emit('newChatMessage', result);
    });

    // ----------------------------------wall---------------------------------------

    socket.on('allwallpost', async () => {
        const getWallPost = await db.getWallPost();
        console.log("getWallPost", getWallPost.rows);

        io.emit('oldWallPost', getWallPost.rows.reverse());

        getWallPost.rows.forEach(wallpost => {
            wallpost.created_at = moment(wallpost.created_at, moment.ISO_8601).fromNow();
        });
    });

    socket.on('wallpost', async (val, id) => {
        console.log(`post from ${userId} to ${id.receiver_id}: ${val}`);
        // const checkFriend = await db.checkFriendship(userId, id.receiver_id);

        let newPost = await db.addWallPost(userId, id.receiver_id, val);
        let userWall = await db.getUserById(userId);

        const wallResult = {...newPost.rows[0], ...userWall.rows[0]};
        console.log("wallResult", wallResult);

        // console.log("newPost.rows", newPost.rows);
        // io.emit('newWallPost', newPost.rows[0]);
        io.emit('newWallPost', wallResult);

        //check if two are friends
        // if(checkFriend.rows[0].accepted) {
        //     //able to write on wall
        // } else {
        //     //not able to write on wall
        // }
        console.log("id.receiver_id", id.receiver_id);
    });

    // ----------------------------------wall---------------------------------------

    socket.on('disconnect', function() {
        console.log(`socket with the id ${socket.id} is now disconnected`);
    });

    // socket.on('newMessage', function(newMessage) {
    //
    //     // delete onOnlineUsers[socket.id];
    //     //online user
    //
    //     console.log("This is new chat message", newMessage);
    //     //figure out who sent message then make a db query to get info about
    //     // that user. THEN -> create a new message object that matches the objects
    //     //in the last 10 chat messages.
    //     //emit that there is a new chat and pass the object.
    //     //add this chat message to our db.
    // });

});
// ----------------------------- part9 -----------------------------
// ----------------------------- wall -----------------------------

// app.get('/userwall/:id', async (req, res) => {
//     // console.log("req.params.id get", req.params.id);
//     // let wallpost = db.getWallPost(req.session.userId);
//     // console.log("wallpost", wallpost);
//     // res.json(wallpost);
//
//     // console.log("req.params.id get", req.params.id);
//     // try {
//     //     let data = await db.getWallPost(req.params.id);
//     //     console.log("data index.js", data);
//     //     res.json(data);
//     // } catch (err) {
//     //     console.log("err", err);
//     // }
// });

// app.post('/userwall/:id', async (req, res) => {
//     console.log("req.params.id post", req.params.id);
//     const sender = req.session.userId;
//     // const { id } = req.params;
//     const receiver = req.params.id;
//     const wall = req.body.wall;
//     console.log("wall", wall);
//
//     try {
//         await db.addWallPost(sender, receiver, wall);
//         res.json(wall);
//     } catch(err){
//         console.log("err in app post /user", err);
//     }
// });


// ----------------------------- wall -----------------------------

server.listen(8080, function() {
    console.log("What's Poppin 😎");
});
