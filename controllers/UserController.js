const UserService = require('../services/UserServices')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

exports.createAdmin = async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({
            type: "UNABLE_TO_PROCESS_DATA",
            message: "Please provide valid data."
        })
    }
    const getUser = await UserService.getUser({ user_type: "admin" });

    if (getUser.exists) {
        return res.status(409).send({
            type: "RESOURCE_ALREADY_EXISTS",
            message: "Admin account is already created."
        })
    }

    if (getUser.error) {
        return res.status(500).send({
            type: "SERVER_ERROR_OCCURED",
            message: "Internal error. Please try again."
        })
    }

    const addAdmin = await UserService.addUser(req.body);
    if (addAdmin.error) {
        console.log(addAdmin)
        return res.status(500).send({
            type: "SERVER_ERROR_OCCURED",
            message: "Internal error. Please try again."
        })
    }
    return res.status(200).send({
        error: false,
        message: "Admin profile is created."
    })
}

exports.login = async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({
            type: "UNABLE_TO_PROCESS_DATA",
            message: "Please provide valid data."
        })
    }
    const getUser = await UserService.getUser({ username: req.body.username });
    if (!getUser.exists) {
        return res.status(404).send({
            type: "RESOURCE_NOT_FOUND",
            message: "User not found."
        })
    }
    const isMatched = await bcrypt.compare(req.body.password, getUser.user.password);
    if (!isMatched) {
        return res.status(401).send({
            type: "UNAUTHORIZED_ACCESS",
            message: "Invalid password."
        })
    }
    const token = await jwt.sign(
        {
            user_id: getUser.user._id,
            user_type: getUser.user.user_type
        },
        process.env.JWT_SECRET,
        {
            expiresIn: 24 * 60 * 60
        }
    )
    getUser.user.password = undefined;
    return res.status(200).send({
        error: false,
        token,
        user: getUser.user
    })
}
