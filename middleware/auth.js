const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) =>{  
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, 'SomethingInTheRain2018');
        const user = await User.findOne({_id: data._id, 'tokens.token': token});

        if(!user){
            throw new Error()
        }

        req.user = user
        req.token =  token
        next()

    }catch (error){
        res.status(401).send({error: "not authorized to access this resource"})
    }
}

module.exports = auth;