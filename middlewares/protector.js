const jwt = require('jsonwebtoken')
const { promisify } = require('util');


exports.protector = async(req, res, next) => {
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer')) throw new Error('Authorization token is missing or invalid')
            const decoded = await promisify(jwt.verify)(token, process.env.ACCESS_TOKEN);
            console.log(decoded)
             req.user = decoded;
    }catch(error){
        res.status(401).json({ message: 'Unauthorized access', error: error.message });
    }
}