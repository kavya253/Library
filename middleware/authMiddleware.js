import jwt from "jsonwebtoken"
import User from "../model/User.js"

export const auth= async(req,res,next)=>{
    console.log(req.headers);
    let token=await req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(403).json({
            message:"please login"
        })
    }
    const decodeToken=await jwt.verify(token,"Secret")
    const user=await User.findById(decodeToken.id)
    if(!user){
        return res.status(403).json({
            message:"the user no longer exits"
        })
    }
    req.user_id=user._id
    next()
}