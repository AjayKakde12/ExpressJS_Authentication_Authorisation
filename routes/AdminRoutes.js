const express = require("express");
const UserController = require("../controllers/UserController")
const router = express.Router();
const Authentication = require("../middlewares/Authentication")

router.post('/create', UserController.createAdmin)
router.post("/login", UserController.login)


module.exports = router;