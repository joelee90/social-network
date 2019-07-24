// function makePasta() {
//     return new Promise((resolve, reject)=> {
//         setTimeout(()=> {
//             console.log('pasta done');
//         }, 1500);
//     });
// }
//
// function makeSauce() {
//     return new Promise((resolve, reject)=> {
//         setTimeout(()=> {
//             console.log('sauce done');
//         }, 500);
//     });
// }
//
// function grateCheese() {
//     return new Promise((resolve, reject)=> {
//         setTimeout(()=> {
//             console.log('cheese done');
//         }, 500);
//     });
// }
//
// // makePasta().then(() => {
// //     makeSauce().then(() => {
// //         grateCheese().then(()=>
// //         console.log('done');)
// //     }))
// // })
//
// async function makeDinner() {
//     try {
//         const pastaPromise = makePasta();
//         const saucePromise = makeSauce();
//         const gratePromise = grateCheese();
//         // console.log(pastaPromise, saucePromise, grateCheese);
//         return {
//             pasta: await pastaPromise,
//             sauce: await saucePromise,
//             cheese: await grateCheese
//         }
//     } catch (e) {
//         console.log(e);
//     }
// }
//
// makeDinner().then(()=> {
//     console.log('all done');
// });
//
//
// //concurrency
// ------------------------------------------------------------------------------------------------

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

    const { first, last, email, password } = req.body;

    try {
        let hash = await bc.hashPassword(password);
        let id = await db.addNewUser(first, last, email, hash);
        req.session.userId = id;
        res.json({ success : true }); //cannot happen until above are done
    } catch (err) {
        console.log("err in POST /registration: ", err);
    }


    // bc.hashPassword(req.body.password)
    //     .then(hashedpassword => {
    //         return db.addNewUser(
    //             req.body.firstname,
    //             req.body.lastname,
    //             req.body.email,
    //             hashedpassword
    //         )
    //             .then(results => {
    //                 // console.log("results", results);
    //                 req.session.userId = results.rows[0].id;
    //                 res.json({ success:true });
    //                 //saving cookie-id when registering new user.
    //             })
    //             .catch(err => {
    //                 console.log("err in post regis", err.message);
    //             });
    //     });

});

// ----------------------------- part1 -----------------------------

// ----------------------------- part2 -----------------------------

// app.get('/login', (req,res) => {
//     res.sendFile(__dirname + '/index.html');
// });

app.post('/login', (req, res) => {
    db.checkEmail(req.body.email)
        .then(val => {
            console.log("req.body.email", req.body.email);
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
