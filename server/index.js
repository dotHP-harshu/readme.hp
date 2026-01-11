require("dotenv").config()
const express = require("express");
const app = express()



app.get("/", (req, res)=>{
    res.send(`Welcome to the readme.hp server.`)
})


const PORT = process.env.PORT || 3000
app.listen(PORT , (error)=>{
    if(error){
        return console.log(error.message);
    }
    console.log("Server started at port=> ", PORT)
})