const User = require("../models/User")
const jwt = require("jsonwebtoken")

exports.getUser = async (filter) => {
    try {
        const getAdmin = await User.findOne(filter);
        if (getAdmin) return { exists: true, user: getAdmin }
        else return { exists: false }
    } catch (error) {
        return {
            error: true,
            message: error.message
        }
    }
}

exports.addUser = async (userData) => {
    try {
        const getAdmin = await User.create(userData);
        if (getAdmin) return { created: true }

    } catch (error) {
        return {
            error: true,
            message: error.message
        }
    }
}

exports.updateUserById = async (id, update = {}) => {
    try {
        const updatedUser = await User.findById(id);
        if(update.password) {
            updatedUser.password = undefined
        }
        updatedUser._doc = {...updatedUser._doc, ...update}
        await updatedUser.save();
        updatedUser._doc.password = undefined

        if (updatedUser) return { update: true, updatedUser: updatedUser._doc }

    } catch (error) {
        return {
            error: true,
            message: error.message
        }
    }
}

exports.deleteUser = async (id) => {
    try {
        const deletedUser = await User.findOneAndRemove({_id: id});
        if(deletedUser == null) {
            return {deleted: false}
        }
        return { deleted: true}

    } catch (error) {
        return {
            error: true,
            message: error.message
        }
    }
}

