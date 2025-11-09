
const User = require("../models/User.js")
const argon2 = require("argon2")
const jwt = require("jsonwebtoken")

const handleErrors = (err) =>{
console.log(err.message, err.code)

let error = {passwd: '', user: '' }

if(err.code === 11000){
error.user = 'This username is already in use'
return error
}

Object.values(err.errors).forEach( ({properties}) =>{
    error[properties.path] = properties.message
})
return error
}




const maxValidDate = 3 * 24 * 60 * 60
const createToken = (id)=>{
 return jwt.sign({id}, "secret", {
    expiresIn: maxValidDate
 })
}


const user_login = (req,res) =>{
    res.render("index")
}
const user_login_post = async (req,res) =>{
    try{
        const {user, pass} = req.body
        console.log(user, pass)
        const rUser = await User.findOne({user})
        console.log(rUser)
        
        if( await argon2.verify(rUser.passwd, pass)){
            res.cookie('NewUser', false, {maxAge: 1000*60*60, httpOnly: true})    
            res.send("Succesfully logged in")
        }else{
            res.status(400).json("The password doesn't match")
        }
    } catch(error){
        console.log(error)
    }
        
    }
const user_signup = (req,res) =>{
    res.render("register")
}

const user_signup_post = async (req,res)=>{
    try{
    const {user ,pass, conPass} = req.body
    console.log(user, pass, conPass)
    if(pass === conPass){
    const hashPass = await argon2.hash(pass)
    const newUser = new User({
        user:user,
        passwd: hashPass
    })
    await newUser.save()
    
    const token = createToken(newUser.id)
    res.cookie("jwt", token, {httpOnly: true, maxAge: maxValidDate*1000})
    res.status(201).json({newUser})
    }
    }catch(err){
        const errors = handleErrors(err)
       res.status(400).json({errors})}


} 




module.exports = {
    user_login,
    user_login_post,
    user_signup,
    user_signup_post
}