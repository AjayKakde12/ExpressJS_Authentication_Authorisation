const express = require("express");
const AdminRoutes = require("./AdminRoutes");

module.exports = (app) => {
    app.use(express.json());
    app.use("/", AdminRoutes);
    app.use("/admin", AdminRoutes);
}