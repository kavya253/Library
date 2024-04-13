import { Router } from "express";
import { addAuthor,getAuthors,getAuthor,updateAuthor,deleteAuthor } from "../controller/authorController.js";
import { auth } from "../middleware/authMiddleware.js";
const authorRouter=Router()
authorRouter.post("/add/author",auth,addAuthor)
authorRouter.get("/getAuthors",auth,getAuthors)
authorRouter.post("/id",auth,getAuthor)
authorRouter.post("/updateAuthor/id",auth,updateAuthor)
authorRouter.post("/deleteAuthor/id",auth,deleteAuthor)
export default authorRouter