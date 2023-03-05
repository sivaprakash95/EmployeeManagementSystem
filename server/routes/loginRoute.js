const express = require("express");
const router = express.Router();

const loginController = require("../controllers/loginController");
const middlewareController = require("../controllers/middleController")

router.route("/login")
.get(loginController.getLogin)
.post(loginController.checkLoginBody, loginController.postLogin)

router.route("/dashboard")
.get(middlewareController.checkSession, loginController.getDashboard)

router.route("/logout")
.get(loginController.getLogout)

router.route("/register")
.get(loginController.getRegister)
.post(loginController.checkRegisterBody, loginController.postRegister)

module.exports = router