DROP TABLE IF EXISTS friendships;
CREATE TABLE friendships(
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES information(id),
    receiver_id INT REFERENCES information(id),
    accepted BOOLEAN DEFAULT false
);
