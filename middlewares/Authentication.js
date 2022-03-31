const jtw = require("jsonwebtoken");

exports.checkAuth = (role) => {
    return (req, res, next) => {
        const authorizationToken = req.headers["authorization"];
        jtw.verify(authorizationToken, process.env.JWT_SECRET, (err, decoder) => {
            if(err) {
                return res.status(401).send({
                    error: true,
                    type: "UNAUTHORIZED_REQUEST",
                    mesage: err.mesage
                })
            }
            if(!role.includes(decoder.user_type)) {
                return res.status(401).send({
                    error: true,
                    type: "UNAUTHORIZED_REQUEST",
                    mesage: "User not authorized."
                })
            }
            if(decoder.username) {
                next();
            }
        })
    }
}