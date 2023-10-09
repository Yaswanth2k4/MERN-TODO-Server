import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const listSchema=new mongoose.Schema({
    text:String,
})

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    notes:[listSchema],
    tokens:[{
        token:String,
    }]
})

userSchema.methods.generateAuthToken=function(){
    try{
        const token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token});
        this.save();
        return token;
    }
    catch(err)
    {
        console.log(err);
    }
}

export default mongoose.model("User",userSchema);