const jwt = require('jsonwebtoken')
const { promisify } = require('util');
require('dotenv').config();


exports.protector = async(req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        console.log('Authorization Header:', authHeader);

        if(!authHeader || !authHeader.startsWith('Bearer')) throw new Error('Authorization token is missing or invalid')
        if(!process.env.ACCESS_TOKEN)  {
                res.status(401);
                throw new Error("Noting is here");
        }
        
            const token = authHeader.split(' ')[1];
            if (!token) {
                res.status(401);
                throw new Error("Not Authorized, no token");
              }

        
            jwt.verify(token, process.env.ACCESS_TOKEN, (err, user)=>{
                if(err) { res.status(401);
                throw new Error("Error while trying to verify");
                }
                res.user = user
                next()
            });

        
           
    }catch(error){
        res.status(401).json({ message: 'Unauthorized access', error: error.message,
            token:process.env.ACCESS_TOKEN,
            token:'token'
         });
        
    }
}