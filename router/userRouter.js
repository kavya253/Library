import { Router } from "express";
import { forgotPassword, login, register, updatePassword } from "../controller/userController.js";
let userRouter=Router();
userRouter.post("/Register",register)
userRouter.post("/login",login)
userRouter.post("/forgotPassword",forgotPassword)
userRouter.post("/updatePassword",updatePassword)
export default userRouter;