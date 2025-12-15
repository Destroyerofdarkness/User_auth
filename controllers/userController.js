
const User = require("../models/User.js")
const argon2 = require("argon2")
const jwt = require("jsonwebtoken")

const { handleErrors } = require("../handlers/errorHandlerAuth.js")




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
    const {user, passwd} = req.body
    console.log(user,passwd)
    try{
        console.log("Attempting login")
       const rUser = await User.login(user ,passwd)
       console.log(rUser)
       const token = createToken(rUser._id)
    res.cookie("jwt", token, {httpOnly: true, maxAge: maxValidDate*1000})
       res.status(200).json({user: rUser._id})
    } catch(error){
        const errors = handleErrors(error)
        res.status(400).json({errors})
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
    const newUser = new User({
        user:user,
        passwd: pass
    })
    await newUser.save()
    
    const token = createToken(newUser._id)
    res.cookie("jwt", token, {httpOnly: true, maxAge: maxValidDate*1000})
    res.status(201).json({newUser})
    }
    else{
        throw Error("Passwords do not match")
    }
    }catch(err){
    const errors = handleErrors(err)
       res.status(400).json({errors})}


} 

const random_page = (req,res) =>{
    res.render("randomPag")
}




module.exports = {
    user_login,
    user_login_post,
    user_signup,
    user_signup_post,
    random_page
}