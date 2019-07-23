const express = require('express');
const app = express();
const compression = require('compression');
const db = require("./utils/db");
const bc = require("./utils/bc");
const cookieSession = require("cookie-session");

app.use(compression());
app.use(express.static('./public'));
app.use(require("body-parser").json());
app.use(
    cookieSession({
        secret: "react is here.",
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

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

app.post('/registration', (req, res) => {
    bc.hashPassword(req.body.password)
        .then(hashedpassword => {
            return db.addNewUser(
                req.body.firstname,
                req.body.lastname,
                req.body.email,
                hashedpassword
            )
                .then(results => {
                    // console.log("results", results);
                    req.session.userId = results.rows[0].id;
                    res.json({ success:true });
                    //saving cookie-id when registering new user.
                })
                .catch(err => {
                    console.log("err in post regis", err.message);
                });
        });

});

// ----------------------------- part1 -----------------------------
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
