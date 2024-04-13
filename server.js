import http from "http"
import app from "./app.js";
const PORT=5000
const server=http.createServer(app)
server.listen(PORT,()=>{
    console.log("the Server is Running in ${PORT}");
})