const jwt = require('jsonwebtoken')
const { promisify } = require('util');
require('dotenv').config();


exports.protector = async(req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        console.log('Authorization Header:', authHeader);

        if(!authHeader || !authHeader.startsWith('Bearer')) throw new Error('Authorization token is missing or invalid')
        
            const token = authHeader.split(' ')[1];
            if (!token) {
                res.status(401);
                throw new Error("Not Authorized, no token");
              }

        
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

             req.user = decoded;
             next()
    }catch(error){
        res.status(401).json({ message: 'Unauthorized access', error: error.message });
    }
}