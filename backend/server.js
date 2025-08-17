import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { shortUrl } from "./routes/routes.js";

dotenv.config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

app.use("/api",shortUrl);

async function connect() {
    try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("database connected");       
    } catch (error) {
        console.log(error);
    }
} 

connect();

const port = 5000;
app.listen(port);