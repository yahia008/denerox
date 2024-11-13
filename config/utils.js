const jwt = require('jsonwebtoken')

exports.generatejwt = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN | 'x3x3x3x3x3x3', { expiresIn: "30d" });
}