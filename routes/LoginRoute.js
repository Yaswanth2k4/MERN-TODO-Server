import express from "express";
import cors from "cors";
import parser from "body-parser";
import User from "../models/userSchema.js";
import bcrypt from "bcrypt";

const saltrounds=10;

const router=express.Router();
router.use(parser.urlencoded({extended:true}));
router.use(parser.json());
router.use(cors());

router.get("/getusers",async(req,res)=>{
    var users=await User.find();
    res.json(users);
    
})

router.post("/register",async(req,res)=>{
    const {name,email,password}=req.body;
    const userExist=await User.findOne({email:email});
    if(!userExist)
    {
        bcrypt.hash(password,saltrounds,function(err,hash){
            const user=new User({
                name:name,
                email:email,
                password:hash
            })
            user.save();
            res.json({message:"Registered successfully, please login"});
        })
    }
    else
    {
        res.json({message:"User already exists, please login"});
    }
})

router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email:email});
    if(user)
    {
        // const token=await user.generateAuthToken();
        // res.cookie("jwtoken",JSON.stringify(token));

        bcrypt.compare(password,user.password,function(err,result){
            if(result)
            {
                res.json({message:user._id});
            }
            else
            {
                res.json({message:"wrong password"});
            }
        })
    }
    else
    {
        res.json({message:"User not found, please register"})
    }
})

export {router as LoginRoute};