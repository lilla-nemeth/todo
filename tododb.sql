CREATE DATABASE tododb2
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) UNIQUE,
    username VARCHAR(50),
    pw VARCHAR(255)
);

CREATE TABLE todos (
	id SERIAL PRIMARY KEY,
    userId INT NOT NULL REFERENCES users,
    importance SMALLINT NOT NULL DEFAULT 1,
    title VARCHAR(255),
    completed BOOLEAN DEFAULT FALSE,
    created TIMESTAMP NOT NULL DEFAULT NOW()   
);