const mongoose = require("mongoose")

const {model, Schema} = mongoose

const userSchema = new Schema({
    user:String,
    passwd: String
})

const user = model("Users", userSchema)

module.exports = user