const jwt = require('jsonwebtoken')

exports.generatejwt = (_id) => {
    return jwt.sign({id:_id}, process.env.ACCESS_TOKEN, { expiresIn: "30d" });
}