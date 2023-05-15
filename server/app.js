import dotenv from "dotenv"
dotenv.config();

import express, { json } from "express";
const app = express();
app.use(express.json());

import authRouter from "./routers/authRouter.js";
app.use(authRouter);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server is running on port ", PORT));