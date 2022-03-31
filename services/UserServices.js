const User = require("../models/User")

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
        userData.user_type = "admin"
        const getAdmin = await User.create(userData);
        if (getAdmin) return { created: true }

    } catch (error) {
        return {
            error: true,
            message: error.message
        }
    }
}

exports.updateUserById = async (id, update) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(id, update, { new: true }).select("-password -createdAt -updatedAt");
        if (updatedUser) return { update: true, updatedUser }

    } catch (error) {
        return {
            error: true,
            message: error.message
        }
    }
}

exports.getJwt = async (data) => {

}
