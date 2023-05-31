import db from "./connection.js";


db.exec(`

CREATE TABLE IF NOT EXISTS roles(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
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

CREATE TABLE IF NOT EXISTS auctions(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    bid INTEGER NOT NULL,
    endDate DATETIME NOT NULL,
    bidUser VARCHAR(32),
    FOREIGN KEY (bidUser) REFERENCES users(username)
);

CREATE TABLE IF NOT EXISTS shoes(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand VARCHAR(16) NOT NULL,
    name VARCHAR(64) NOT NULL,
    model VARCHAR(16) NOT NULL,
    colorway VARCHAR(64) NOT NULL,
    quantity SHORTINT NOT NULL,
    size VARCHAR(4) NOT NULL,
    price INTEGER,
    forAuction TINYINT(1)
);

CREATE TABLE IF NOT EXISTS auction_items(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    shoeID INTERGER NOT NULL,
    auctioneer VARCHAR(32) NOT NULL,
    auctionID INTEGER,
    FOREIGN KEY (auctionID) REFERENCES auction(id),
    FOREIGN KEY (auctioneer) REFERENCES users(username),
    FOREIGN KEY (shoeID) REFERENCES shoes(id)
);

CREATE TABLE IF NOT EXISTS photos(
    shoeID INTEGER NOT NULL,
    forAuction TINYINT(1),
    photoLocation TEXT PRIMARY KEY,
    FOREIGN KEY (shoeID) REFERENCES shoes(id)
);

CREATE TABLE IF NOT EXISTS orders(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(32) NOT NULL,
    shoeID INTEGER NOT NULL,
    status VARCHAR(16) NOT NULL,
    FOREIGN KEY (shoeID) REFERENCES shoes(id)
    FOREIGN KEY (username) REFERENCES users(username)
);
`);

db.exec(`INSERT INTO roles (role) VALUES ('user');`);
db.exec(`INSERT INTO roles (role) VALUES ('auctioneer');`);
db.exec(`INSERT INTO roles (role) VALUES ('admin');`);
