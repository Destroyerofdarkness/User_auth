document.addEventListener("DOMContentLoaded", (e) => {
const form = document.querySelector("form");
const userError = document.querySelector(".user.error");
const passError = document.querySelector(".pass.error");



console.log(user)
console.log(pass)

form.addEventListener("submit", async (e) => {
  e.preventDefault();
const user = form.user.value
const pass = form.pass.value
const conPass = form.conPass.value


  userError.textContent = "";
  passError.textContent = "";
  try {
const res = await fetch("signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({user, pass, conPass})
    })
    const data = await res.json();
    console.log(data)
    if (data.errors) {
      userError.textContent = data.errors.user;
      passError.textContent = data.errors.passwd;
    }
    if(data.newUser){
        location.assign("/")
    }
  } catch (err) {
    console.log(err);
  }
});
})