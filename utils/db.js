var spicedPg = require('spiced-pg');
let db;

if(process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    db = spicedPg('postgres:postgres:postgres@localhost:5432/social');
}

exports.addNewUser = function addNewUser(firstname, lastname, email, password) {
    return db.query(
        `INSERT INTO information (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING id`,
        [ firstname, lastname, email, password ]
    );
};
