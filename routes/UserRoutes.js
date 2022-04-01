const express = require("express");
const UserController = require("../controllers/UserController")
const router = express.Router();
const Authentication = require("../middlewares/Authentication")


router.post('/create', UserController.registerUser)


module.exports = router;