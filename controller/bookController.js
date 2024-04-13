import Author from "../model/Author.js"
import Book from "../model/Book.js"
export const getBooks=async (req,res)=>{
    try {
        const allBooks=await Book.find().populate("author")
        if(!allBooks){
            return res.status(400).json({
                status:"Failure",
                message: "didn't find books"
            })
        }
        res.status(200).json({
            status: "success",
            message:allBooks       
        })
    } catch (error) {
        res.status(500).json({
            status:"Failure",
            message:error.messsage
        })
    }
}

export const addBook=async (req,res)=>{
    try{
    const {name,source,publishedAt,rating,authorName} = req.body
    const existingBook=await Book.findOne({name:name})
    console.log(existingBook);
    if(existingBook){
        return res.status(400).json({
            status:"failure",
            message:"book already exists"
        })
    
    }
    const existingAuthor=await Author.findOne({name:authorName})
    console.log(existingAuthor);
    const newBook= await Book.create({name,source,publishedAt,rating})
    newBook.author=existingAuthor._id
    await newBook.save()

    existingAuthor.booksByAuthor.push(newBook._id)
    await existingAuthor.save()
    res.status(201).json({
        status:"success",
        message:newBook
    })
}catch(error){
    res.status(500).json({
        status:"Failure",
        message:error.message
    })   
}
}   
