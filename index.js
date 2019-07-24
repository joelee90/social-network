const express = require('express');
const app = express();
const compression = require('compression');
const db = require("./utils/db");
const bc = require("./utils/bc");
const cookieSession = require("cookie-session");

const csurf = require('csurf'); //use after the cookie

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
        req.session.userId = id;
        res.json({ success : true }); //cannot happen until above are done
    } catch (err) {
        res.json({ success : false });
        console.log("err in POST /registration: ", err);
    }
});

// ----------------------------- part1 -----------------------------

// ----------------------------- part2 -----------------------------

app.post('/login', (req, res) => {

    const { email, password } = req.body;

    db.checkEmail(email)
        .then(val => {
            if(val.rowCount == 0) {
                res.json({login:false});
            }
            console.log("val", val);
            bc.checkPassword(password, val.rows[0].password)
                .then(match => {
                    if(match) {
                        req.session.userId = val.rows[0].id;
                        res.json({login:true});
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
