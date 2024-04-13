import { Router } from "express";
import { getBooks,addBook } from "../controller/bookController.js";
const bookRouter=Router();

bookRouter.get("/getBooks",getBooks)
bookRouter.post("/addBook",addBook)

export default bookRouter