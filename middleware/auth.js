const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv/config');

const {JWT_KEY} = process.env

const auth = async (req, res, next) =>{  
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, JWT_KEY);
        // const user = await User.findOne({_id: data.id}).select({_id: 0});
        const user = await User.findOne({_id: data.id, 'tokens.token': token});

        if(!user){
            throw new Error()
        }

        req.user = user
        req.token =  token
        next()

    }catch (error){
        // console.log(error)
        res.status(401).send({error: "not authorized to access this resource"})

    }
}

module.exports = auth;
