import express from "express";
import mongoose from "mongoose";
import parser from "body-parser";
import dotenv from "dotenv";
import {LoginRoute} from "./routes/LoginRoute.js";
import { NotesRoute } from "./routes/NotesRoute.js";z

const app=express();
app.use(parser.urlencoded({extended:true}));
app.use(parser.json());

dotenv.config();

mongoose.connect(process.env.DATABASE);

app.use("/",LoginRoute);
app.use("/notes",NotesRoute);

let port=process.env.PORT;

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})