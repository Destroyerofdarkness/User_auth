document.addEventListener("DOMContentLoaded", (e)=>{
    const userError = document.querySelector(".login.error");
    const passError = document.querySelector(".pass.error");
    const form = document.querySelector("form");
    console.log(form)
    form.addEventListener("submit", async (e)=>{
        e.preventDefault()
        passError.textContent = ''
        userError.textContent = ''
        const user = form.user.value
        const passwd = form.passwd.value
        try{
            const res = await fetch("/login",{
                method: "POST",
                body: JSON.stringify({user, passwd}),
                 headers: { "Content-Type": "application/json" }
            })
            
        const data = await res.json()
        console.log(data)
        if(data.user){
            location.assign("/")
        }
        if(data.errors){
            userError.textContent = data.errors.user
            passError.textContent = data.errors.passwd
        }
        }catch(err){
            console.error(err)
        }


    })
})