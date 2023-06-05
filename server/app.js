import dotenv from "dotenv"
import helmet from "helmet"
dotenv.config();

import express, { json } from "express";
const app = express();
app.use(express.json());
app.use(helmet())

import cors from "cors"
app.use(cors({
    credentials: true,
    origin: true
}));

import session from "express-session";
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

import http from "http";
import { Server } from "socket.io";

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["*"]
    }
});

io.on("connection", (socket) => {
    socket.on("placeBid", (bidData) => {
        io.emit("bidUpdate", bidData);
    });
});


import authRouter from "./routers/authRouter.js";
app.use(authRouter);

import storeRouter from "./routers/storeRouter.js";
app.use(storeRouter);

import auctionRouter from "./routers/auctionRouter.js";
app.use(auctionRouter);

import emailRouter from "./routers/emailRouter.js";
app.use(emailRouter);


const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log("Server is running on port ", PORT));