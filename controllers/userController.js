
const User = require("../models/User.js")
const argon2 = require("argon2")

const user_login = (req,res) =>{
    res.render("index")
}
const user_login_post = async (req,res) =>{
    const {user, pass} = req.body
    console.log(user, pass)
    const rUser = await User.findOne({user})
    console.log(rUser)
    
    if( await argon2.verify(rUser.passwd, pass)){
            res.send("Succesfully logged in")
    }else{
        res.status(400).json("Couldnt log in")
    }
        
    }
const user_signup = (req,res) =>{
    res.render("register")
}

const user_signup_post = async (req,res)=>{
    const {user,pass, conPass} = req.body
    console.log(user, pass, conPass)
    if(pass === conPass){
      const hashPass =  await argon2.hash(pass)
    const newUser = new User({
        user:user,
        passwd: hashPass
    })
    await newUser.save()
    .then((result)=> {
        res.status(201).json(result)
        res.redirect("/login")
        
    })
    .catch((err)=> console.log(err))


} else{
    console.log("Password doesnt match")
    res.render("register")
}
}




module.exports = {
    user_login,
    user_login_post,
    user_signup,
    user_signup_post
}