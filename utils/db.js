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

exports.checkEmail = function checkEmail(email) {
    return db.query(
        `SELECT * FROM information WHERE email = $1 `, [email]
    );
};

//find users info to add img url.
exports.getUserById = function getUserById(id) {
    return db.query (
        `SELECT id, firstname, lastname, url, bio FROM information WHERE id=$1`, [id]);
};


exports.addUserImage = function addUserImage(url, id) {
    return db.query(
        `UPDATE information SET url = $1 WHERE id = $2 RETURNING url`,
        [ url, id ]
    );
};

exports.updateUserBio = function updateUserBio(bio, id) {
    return db.query(
        `UPDATE information SET bio = $1 WHERE id = $2 RETURNING bio`,
        [bio, id]
    );
};

exports.getNewUsers = function getNewUsers() {
    return db.query(
        `SELECT id, firstname, lastname, url FROM information ORDER BY created_at DESC LIMIT 3`
    );
};

exports.getMatching = function getMatching(val) {
    return db.query(
        `SELECT * FROM information WHERE firstname ILIKE $1 OR lastname ILIKE $1`,
        [val + '%']
    );
};

exports.checkFriendship = function checkFriendship(sender_id, receiver_id) {
    return db.query (
        `SELECT * FROM friendships WHERE (sender_id=$1 AND receiver_id=$2) OR (sender_id=$2 AND receiver_id = $1)`,
        [sender_id, receiver_id]
    );
};

exports.makeFriendRequest = function makeFriendRequest(sender_id, receiver_id) {
    return db.query(
        `INSERT INTO friendships (sender_id, receiver_id) VALUES ($1, $2) RETURNING *`,
        [sender_id, receiver_id]
    );
};

exports.acceptFriendRequest = function acceptFriendRequest(sender_id, receiver_id) {
    return db.query(
        `UPDATE friendships SET accepted=true WHERE (sender_id=$1 AND receiver_id=$2) OR (sender_id=$2 AND receiver_id = $1)`,
        [sender_id, receiver_id]
    );
};

exports.cancelFriend = function cancelFriend(sender_id, receiver_id) {
    return db.query(
        `DELETE FROM friendships WHERE (sender_id=$1 AND receiver_id=$2) OR (sender_id=$2 AND receiver_id = $1)`,
        [sender_id, receiver_id]
    );
};

exports.getUsersdb = function getUsersdb(id) {
    return db.query (
        `SELECT information.id, firstname, lastname, url, accepted, sender_id
        FROM friendships
        JOIN information
        ON (accepted = false AND receiver_id = $1 AND sender_id = information.id)
        OR (accepted = false AND sender_id = $1 AND receiver_id = information.id)
        OR (accepted = true AND receiver_id = $1 AND sender_id = information.id)
        OR (accepted = true AND sender_id = $1 AND receiver_id = information.id)`,
        [id]
    );
};
//query to get the combined list of friends(accepted=true) and wannabes(accepted=false).

exports.saveMessages = function saveMessages(sender_id, message) {
    return db.query (
        `
        INSERT INTO chats (sender_id, message) VALUES ($1, $2) RETURNING *
        `, [sender_id, message]
    );
};

exports.getLastTenMessages = function getLastTenMessages() {
    return db.query (
        `
        SELECT chats.id, sender_id, chats.message, chats.created_at, information.firstname, information.lastname, information.url
        FROM chats
        LEFT JOIN information
        ON information.id = chats.sender_id
        ORDER BY chats.created_at DESC
        LIMIT 10
        `
    );
};

exports.addWallPost = function addWallPost (sender_id, receiver_id, wall) {
    return db.query (
        `
        INSERT INTO wall (sender_id_wall, receiver_id_wall, wall) VALUES ($1, $2, $3) RETURNING *
        `, [sender_id, receiver_id, wall]
    );
};

// exports.getWallPost = function getWallPost () {
//     return db.query (
//         `
//         SELECT wall.id, sender_id, receiver_id, wall.wall, wall.created_at, information.firstname, information.lastname, information.url FROM wall
// 	INNER JOIN friendships ON (sender_id_wall = $1 AND receiver_id_wall = $2) OR (receiver_id_wall = $1 AND sender_id_wall = $2) LEFT JOIN information ON friendships.sender_id = information.id ORDER BY wall.id DESC LIMIT 100
//         `
//     );
// };

exports.getWallPost = function getWallPost (id) {
    return db.query (
        `
        SELECT sender_id_wall, receiver_id_wall, wall FROM wall WHERE receiver_id_wall = $1
        `, [id]
    );
};
