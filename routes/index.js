const express = require("express");
const AdminRoutes = require("./AdminRoutes");
const UserRoutes = require("./UserRoutes")
const AuthenticationRoutes = require("./AuthenticationRoutes")
const ProductRoutes = require("./ProductRoutes")

module.exports = (app) => {
    app.use(express.json());
    app.use("/", AuthenticationRoutes);
    app.use("/admin", AdminRoutes);
    app.use("/user", UserRoutes);
    app.use("/product", ProductRoutes)

}