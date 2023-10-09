import express from "express";
import cors from "cors";
import parser from 'body-parser';
import User from "../models/userSchema.js";

const router=express.Router();
router.use(parser.urlencoded({extended:true}));
router.use(cors());

router.get("/getnotes/:uid",async(req,res)=>{
    const user=await User.findById({_id:req.params.uid});
    res.json(user.notes);
})

router.post("/postnote/:uid",async(req,res)=>{
    const text=req.body;
    const user=await User.findById({_id:req.params.uid})
    user.notes.push(text);
    user.save();
    const addedNote=user.notes[user.notes.length-1];
    res.json(addedNote);
})

router.patch("/changenote/:uid/:id", async(req,res)=>{
    const user=await User.findById({_id:req.params.uid});
    for(let i=0;i<user.notes.length;i++)
    {
        if(user.notes[i]._id.toString()===req.params.id)
        {
            user.notes[i].text=req.body.text;
            user.save();
            res.json(user.notes[i]);
            break;
        }
    }
})

router.delete("/deletenote/:uid/:id",async(req,res)=>{
    try{
        const user=await User.findByIdAndUpdate({_id:req.params.uid},{$pull:{notes:{_id:req.params.id}}});
        res.json({"message":"deleted"})
    }
    catch(err)
    {
        res.json({"message":"error deleting the note"})
    }
})

export {router as NotesRoute};