import express from "express";
import mongoose from "mongoose";
import parser from "body-parser";
import dotenv from "dotenv";
import {LoginRoute} from "./routes/LoginRoute.js";
import { NotesRoute } from "./routes/NotesRoute.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));


const app=express();
app.use(parser.urlencoded({extended:true}));
app.use(parser.json());
app.use(express.static(path.join(__dirname,"public")));

dotenv.config();

mongoose.connect(process.env.DATABASE);

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"));
})

app.use("/",LoginRoute);
app.use("/notes",NotesRoute);

let port=process.env.PORT;

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
