const mongoose = require("mongoose")

const {model, Schema} = mongoose

const userSchema = new Schema({
    user:{
        type: String,
        required: true,
        unique:true
    },
    passwd: {type: String,
        required:true,
        minLength: 6

    }
})

const user = model("Users", userSchema)

module.exports = user