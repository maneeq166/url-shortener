import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { shortUrl } from "./routes/routes.js";
import authRouter from "./routes/auth/index.js";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:"http://localhost:3000",
}))

app.use("/api",shortUrl);
app.use("/auth",authRouter);

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
app.listen(port,()=>{
    console.log(`listening on http://localhost/${port}`);
    
});