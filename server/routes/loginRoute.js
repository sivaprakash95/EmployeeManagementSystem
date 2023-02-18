const express = require("express");
const loginController = require("../controllers/loginController");

const router = express.Router();

router.route("/login").get(loginController.getLogin).post(loginController.postLoginBody, loginController.postLogin)

module.exports = router