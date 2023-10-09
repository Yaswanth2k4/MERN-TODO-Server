import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

const Authenticate= async(req,res,next)=>{
    try{
        const token=req.cookies.jwtoken;
        console.log(token);
        const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
        const rootUser=await User.findOne({_id:verifyToken._id,"tokens.token":token});

        if(!rootUser){throw new Error("User not found")}

        req.token=token;
        req.rootUser=rootUser;
        next();
    }
    catch(err)
    {
        res.status(401).send("Unauthorized access : token not found");
        console.log(err);
    }
}

export {Authenticate as auth};
