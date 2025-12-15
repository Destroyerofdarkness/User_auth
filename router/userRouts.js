 const express = require("express")

const router = express.Router()

 const controller = require("../controllers/userController.js")

const {authenticate} = require("../handlers/authenticationHandler.js")

router.get("/", controller.user_login)

router.post("/", controller.user_login_post)

router.get("/signup", controller.user_signup)

router.post("/signup", controller.user_signup_post)

router.get("/random-page", authenticate, controller.random_page)

module.exports = router