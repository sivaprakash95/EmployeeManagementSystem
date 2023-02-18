const express = require("express");
const userController = require("../../controllers/apis/users")
// const {getAllUser,getSingleUser,createUser,updateUser,deleteUser} = require("../controllers/usersController")
// ----------------USER Router---------------
const router = express.Router()

router.param("id",userController.checkId)

router.route("/")
.get(userController.getAllUser)
.post(userController.checkBody, userController.createUser);

router.route("/:id")
.get(userController.getSingleUser)
.patch(userController.updateUser)
.delete(userController.deleteUser);

module.exports =  router