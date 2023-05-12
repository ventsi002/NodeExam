import db from "./connection.js";


db.exec(`

CREATE TABLE IF NOT EXISTS roles(
    id TINYINT PRIMARY KEY,
    role VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS users(
    username VARCHAR(32) PRIMARY KEY,
    password TEXT NOT NULL,
    firstName VARCHAR(32) NOT NULL,
    lastName VARCHAR(32) NOT NULL,
    email VARCHAR(64) NOT NULL,
    address TEXT NOT NULL,
    role TINYINT,
    FOREIGN KEY (role) REFERENCES roles (id) 
);

CREATE TABLE IF NOT EXISTS auction(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    bid INTEGER NOT NULL,
    bidUser VARCHAR(32),
    FOREIGN KEY (bidUser) REFERENCES users(username)
);

CREATE TABLE IF NOT EXISTS shoes(
    brand VARCHAR(16) NOT NULL,
    name VARCHAR(64) NOT NULL,
    model VARCHAR(16) NOT NULL,
    colorway VARCHAR(64) NOT NULL,
    quantity SHORTINT NOT NULL,
    size TINYINT NOT NULL,
    price INT NOT NULL,
    forAuction TINYINT(1),
    PRIMARY KEY (model, forAuction, size)
);
`);
