const express = require("express");

const ProductController = require("../controllers/ProductController");
const Authentication = require("../middlewares/Authentication");

const router = express.Router();


router.post("/create", Authentication.checkAuth(["user"]), ProductController.createProduct)

router.put("/update", Authentication.checkAuth(["admin"]), ProductController.updateProduct)

router.get("/get_by_id", Authentication.checkAuth(["user", "admin"]), ProductController.getProductById)

router.post("/get_all", Authentication.checkAuth(["admin", "user"]), ProductController.getAllProducts)

router.delete("/delete", Authentication.checkAuth(["admin"]), ProductController.deleteProduct)

module.exports = router;

