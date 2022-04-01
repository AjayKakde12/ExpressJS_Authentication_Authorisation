const express = require("express");
const UserController = require("../controllers/UserController")
const router = express.Router();
const Authentication = require("../middlewares/Authentication")


router.post('/create', UserController.createAdmin)

router.post("/login", UserController.login)

router.put("/update_user", Authentication.checkAuth(["admin"]), UserController.updateUser)

router.delete("/delete_user", Authentication.checkAuth(["admin"]), UserController.deleteUser)


module.exports = router;