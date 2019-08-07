DROP TABLE IF EXISTS wall;
CREATE TABLE wall(
    id SERIAL PRIMARY KEY,
    sender_id_wall INT REFERENCES information(id),
    receiver_id_wall INT REFERENCES information(id),
    wall VARCHAR(1000),
    url VARCHAR(1000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
