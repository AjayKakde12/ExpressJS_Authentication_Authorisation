const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    user_type: {
        type: String,
        enum: ["user", "admin"]
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

UserSchema.index({username: 1})

UserSchema.pre("save", async function(next) {
    const salt = bcrypt.genSaltSync(10);
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hashSync(this.password, salt);
    console.log("", this.password)
    next();
})

module.exports = mongoose.model("user", UserSchema);

