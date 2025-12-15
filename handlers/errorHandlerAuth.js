const handleErrors = (err) =>{
console.log(err.message, err.code)

let error = {passwd: '', user: '' }

if(err.message.includes("The user doesn't exist")){
error.user = "That user is not registered"
return error
}
if(err.message.includes("Password doesn't match")){
error.passwd = "Incorrect password"
return error
}

if(err.code === 11000){
error.user = 'This username is already in use'
return error
}
if(err.message.includes("Users validation failed")){
Object.values(err.errors).forEach( ({properties}) =>{
    error[properties.path] = properties.message
})}
return error
}


module.exports = {handleErrors}