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

app.use(
    cookieSession({
        secret: "react is here.",
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);
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
        console.log("rows", rows);
        res.json(rows);
    } catch(err) {
        console.log("err in get friends", err);
    }
});
// ----------------------------- part8 -----------------------------
app.get('*', function(req, res) {
    if(!req.session.userId) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
}); //if no cookie(not registered) redirect to /welcome

app.listen(8080, function() {
    console.log("What's Poppin 😎");
});
