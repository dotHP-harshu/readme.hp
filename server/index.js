require("dotenv").config()
const express = require("express");
const app = express()
const cors = require("cors")
const GithubRoutes = require("./routes/github.route");
const AiRouter = require("./routes/ai.route");


app.use(cors({credentials:true, origin:process.env.CLIENT_URL}))
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.use("/github", GithubRoutes)
app.use("/ai", AiRouter)

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