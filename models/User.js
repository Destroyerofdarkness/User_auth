const mongoose = require("mongoose")
const validate = require("validator")
const argon2 = require("argon2")
const {model, Schema} = mongoose

const userSchema = new Schema({
    user:{
        type: String,
        required: [true, "Enter a name in the input"],
        unique: true,
        
    },
    passwd: {
        type: String,
        required: [true, "Enter your password"],
        minlength: [6, "Password must be minimum 6 letters"]

    }
})

userSchema.pre("save", async function(next){
    try{
        this.passwd = await argon2.hash(this.passwd)
        next()
    }catch(err){
        next(err)
    }
 
})

const user = model("Users", userSchema)

module.exports = user