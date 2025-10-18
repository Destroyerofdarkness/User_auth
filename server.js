const express = require("express")

const app =  express()

const ejs = require("ejs")

const mongoose = require("mongoose")

const userRouter = require("./router/userRouts")

mongoose.connect("mongodb://localhost:27017/", {dbName: "node_auth"})
    .then((result) => app.listen(3000))
    .catch((err)=>console.log(err))


app.use(express.urlencoded({extended:true}))
app.set("view engine", "ejs")
app.use(express.json())

app.use(userRouter)






