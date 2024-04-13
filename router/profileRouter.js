import { Router } from "express";
import User from "../model/User.js";
import { auth } from "../middleware/authMiddleware.js";

const profileRouter=Router();

profileRouter.get("/home",auth,async (req,res)=>{
    const user=await User.findById(req.user_id);
    res.send(`this is home page Welcome ${user.name}`)
})

export default profileRouter