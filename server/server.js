import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import { errorhandler } from "./middilewares/errorHandling.js";
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import locationRoutes from './routes/locationRoutes.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config();


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    console.log(`to req to ${req.url} with method: ${req.method}`);
    if (req.body && Object.keys(req.body).length > 0) {
        console.log("body is", req.body);
    }
    next();
});

app.use( cors());
// {
//     origin: "http://localhost:5173",
//     credentials: true
// }

app.use('/auth', authRoutes);
app.use('/users',userRoutes);
app.use('/location',locationRoutes)
app.use(errorhandler);



console.log(process.env.URI);
connectDB().then(()=>{
    app.listen(process.env.PORT ||5000, ()=>{
        console.log('listening on port 5000')
    })
})
