const express = require("express");
const loginController = require("../controllers/loginController");

const router = express.Router();

router.route("/login")
.get(loginController.getLogin)
.post(loginController.checkLoginBody, loginController.postLogin)

router.route("/dashboard")
.get(loginController.getDashboard)

router.route("/logout")
.get(loginController.getLogout)

router.route("/register")
.get(loginController.getRegister)
.post(loginController.checkRegisterBody, loginController.postRegister)

module.exports = router