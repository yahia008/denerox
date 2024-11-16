const jwt = require('jsonwebtoken')

exports.generatejwt = (user) => {

    if (typeof user !== 'object' || Array.isArray(user)) {  
        throw new Error("The 'user' parameter must be a plain object.");  
    }  
    
    if (!process.env.ACCESS_TOKEN) {  
        throw new Error("ACCESS_TOKEN environment variable is not set.");  
    }  

    return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "30d" });
}