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

// ----------------------------- part2 -----------------------------
app.get('*', function(req, res) {
    if(!req.session.userId) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
}); //if no cookie(not registered) redirect to /welcome

app.listen(8080, function() {
    console.log("I'm listening.");
});
