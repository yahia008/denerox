const jwt = require('jsonwebtoken')

exports.generatejwt = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "30d" });
}