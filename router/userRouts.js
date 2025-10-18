 const express = require("express")

const router = express.Router()

 const controller = require("../controllers/userController.js")

router.get("/login", controller.user_login)
router.post("/login", controller.user_login_post)
router.get("/signup", controller.user_signup)
router.get("/signup", controller.user_login_post)



module.exports = router