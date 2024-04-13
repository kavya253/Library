import Author from "../model/Author.js"

export const  addAuthor= async (req,res)=>{
    try{
    const exitingAuthor=await Author.findOne({
        name:req.body.name
    })
    if(exitingAuthor){
        return res.status(200).json({
            message:"Author already present"
        })
    }
    const newAuthor=await Author.create({
        name:req.body.name,
        booksOfAuthor:[]
    })
    res.status(200).json({
        status:"success",
        message:newAuthor
    })}catch(error){
        res.status(500).json({
            status:"failure",
            message:error.message
        })
    }


} 

export const getAuthor= async (req,res)=>{
    try {
        console.log(req.params.id);
        const existingAuthor=await Author.findById({id:req.params.id})
        console.log(existingAuthor);
        if(!existingAuthor){
            return res.status(400).json({
                status:"failure",
                message:error.message
            })
        }
        res.status(201).json({
            status:"success",
            message:existingAuthor
        })   
    } catch (error) {
        res.status(500).json({
            status:"failure",
            message:error.message
        })
    }
}
export const getAuthors=async (req,res)=>{
    try {
        const allAuthor= await Author.find().populate("booksByAuthor")
        if(!allAuthor){
            return res.status(400).json({
                status:"failure",
                message:error.message
            })
        }
        res.status(200).json({
            status:"success",
            message:allAuthor
        })
    } catch (error) {
        res.status(500).json({
            status:"failure",
            message:error.message
        })
    }
}
export const updateAuthor=async (req,res)=>{
    try {
        const existingAuthor=await Author.findByIdAndUpdate({id:req.params.id},{name:req.body.name})
        if(!existingAuthor){
            return res.status(400).json({
                status:"failure",
                message:"Author not deleted"
            })
        }
        res.status(200).json({
            status:"success",
            message: "Author updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            status:"failure",
            message:error.message
        })
    }
}
export const deleteAuthor=async (req,res)=>{
    try {
        const deletedAuthor=await Author.findByIdAndDelete({id:req.params.id})
        if(!deleteAuthor){
            return res.status(400).json({
                status:"failure",
                message:"Author not deleted"
            })
        }
        res.status(200).json({
            status:"success",
            message:"Author deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            status:"failure",
            message:error.message
        })
    }
}