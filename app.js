import express from "express"
import {db} from "./config/db.js"
import userRouter from "./router/userRouter.js";
import  profileRouter  from "./router/profileRouter.js";
import authorRouter from "./router/authorRouter.js";
import bookRouter from "./router/bookRouter.js";
db();
const app=express()
app.use(express.json())
app.use("/api/v1/users",userRouter)
app.use("/api/v1/profile",profileRouter)
app.use("/api/v1/author",authorRouter)
app.use("/api/v1/books",bookRouter)
export default app;