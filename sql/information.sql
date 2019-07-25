DROP TABLE IF EXISTS information;

CREATE TABLE information(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    url VARCHAR(300),
    bio text,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
