const express = require("express")

const cookieParser = require("cookie-parser");

const app =  express()

const ejs = require("ejs")

const mongoose = require("mongoose")

const userRouter = require("./router/userRouts")

mongoose.connect("mongodb://localhost:27017/", {dbName: "node_auth"})
    .then((result) => app.listen(25565, '0.0.0.0', ()=>{
        console.log(`Server running at http://${require('os').hostname}:3000`)
    }))
    .catch((err)=>console.log(err))


app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.set("view engine", "ejs")
app.use(express.json())

app.use(userRouter)






