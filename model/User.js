import mongoose, { Schema,Model } from "mongoose";
import bycrpt from "bcrypt"
const userSchema=new Schema({
    name:{
        type:String,
        trim:true,
        required:[true,"name field is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:true,
        minLength:[8,"min length should be 8"]
    },
    confirmPassword:{
        type:String,
        required:true,
        validate:{
            validator:function(value){
                return this.password===value
            },
            message:"The confirm password did not match with password field"
        }
    },otp:{
        type:Number
    },otpexpiresAt:{
        type:String
    }
    
},{timestamps:true})

userSchema.pre("save", async function(next){
    let salt=await bycrpt.genSalt(10)
    this.password=await bycrpt.hash(this.password,salt);
    next();
})
userSchema.methods.verifyPassword=async function(pwd,pwdDB){
    return await bycrpt.compare(pwd,pwdDB)
}
const User=mongoose.model("User",userSchema)
export default User;