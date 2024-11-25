const jwt = require('jsonwebtoken')
const { promisify } = require('util');


exports.protector = async(req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        console.log('Authorization Header:', authHeader);

        if(!authHeader || !authHeader.startsWith('Bearer')) throw new Error('Authorization token is missing or invalid')
            console.log(authHeader, 'smtin')
            const token = authHeader.split(' ')[1];

            console.log(process.env.ACCESS_TOKEN)
            const decoded = await promisify(jwt.verify)(token, process.env.ACCESS_TOKEN);
            console.log(decoded)
             req.user = decoded;
             next()
    }catch(error){
        res.status(401).json({ message: 'Unauthorized access', error: error.message });
    }
}