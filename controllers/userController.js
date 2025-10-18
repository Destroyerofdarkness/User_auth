
const User = require("../models/User.js")


const user_login = (req,res) =>{
    res.render("index")
}
const user_login_post = (req,res) =>{
    
}
const user_signup = (req,res) =>{
    res.render("register")
}

const user_signup_post = (req,res)=>{
    const {user,pass, conPass} = req.body
    console.log(user, pass, conPass)
    
    if(pass, conPass){
    const newUser = new User({
        user:user,
        passwd: pass
    })
} else{
    res.render("register")
}
}




module.exports = {
    user_login,
    user_login_post,
    user_signup,
    user_signup_post
}