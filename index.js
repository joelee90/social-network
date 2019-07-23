const express = require('express');
const app = express();
const db = require("./utils/db");
const bc = require("./utils/bc");
const compression = require('compression');


app.use(compression());
app.use(express.static('./public'));
app.use(require("body-parser").json());

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
    res.json({});
});

app.post('/registration', (req, res) => {
    db.addNewUser(
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.password,
    )
        .then(()=> {
            res.json({
                process: "success"
            });
        });
});



// ----------------------------- part1 -----------------------------
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
