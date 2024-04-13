import User from "../model/User.js";
import jwt from "jsonwebtoken"
import  sendMail  from "../utils/sendMail.js";
import { error } from "console";
import { use } from "bcrypt/promises.js";
export const register=async (req,res)=>{
    try {
        const existingUser= await User.findOne({
            email: req.body.email
        })
        if(existingUser){
            res.status(200).json({
                message:"already user present please login"
            })
        }
        const newUSer= await User.create(req.body)
        res.status(200).json({
            status:"success",
            data:newUSer
        })
    } catch (error) {
        res.status(500).json({
            status:"failure",
            message:error.message
        })
    }
}

export const login=async (req,res)=>{
    try {
        const existingUser= await User.findOne({
            email: req.body.email
        })
        if(!existingUser || !(await existingUser.verifyPassword(req.body.password,existingUser.password))){
            return res.status(201).json({
                message:"password didn't match or please register first"
            })
        }
        let token=await jwt.sign({id:existingUser._id},'Secret',{
            expiresIn:24*60*60
        })
        res.status(200).json({
            status:"success",
            message:existingUser,token
        })
    } catch (error) {
        res.status(500).json({
            status:"failure",
            message:error.message
        })
    }
}

export const forgotPassword=async(req,res)=>{
    try{
    const existingUser=await User.findOne({email:req.body.email})
    if(!existingUser){
        return res.status(400).json({
            status:"failure",
            message:"User not exits,Please register"
        })
    }
    existingUser.otp=Math.round(Math.random()*100000000)
    existingUser.otpexpiresAt=Date.now()+5*60*1000
    await existingUser.save({validateBeforeSave:false})
    sendMail(existingUser.otp,existingUser.to_email)
    res.status(200).json({
        status:"success",
        message:"mail sent successfully"
    })
    }catch(error){
        res.status(500).json({
            status:"failure",
            message:error.message
        })

    }
}

export const updatePassword= async (req,res)=>{
  try {
    const userExists=await User.findOne({
        otp: req.body.otp,
        otpexpiresAt: {$gte: Date.now()}
    })
    if(! userExists){
        res.status(400).json({
            status:"failure",
            message:"otp expired or invalid otp"
        })
    }
    if(req.body.password!==req.body.confirmPassword){
        res.status(400).json({
            status:"failure",
            message:"password and confirm password didn't match"
        })
    }
    userExists.password=req.body.password
    userExists.confirmPassword=req.body.confirmPassword
    userExists.otp=undefined
    userExists.otpexpiresAt=undefined
    await userExists.save()
    res.status(200).json({
        message:"paswword reset successfull"
    })
    
    } catch (error) {
    res.status(500).json({
        status:"failure",
        message:error.message
    })
  }
}