let User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};
//login registered user
const loginUser = async (req, res) =>{
  try{
      const {email, password } = req.body;
      const user = await User.findByCredentials(email, password);
      
      if(!user){
          return res.status(401).send({error: 'Login Failed! Check authentication credentials'})
      }
      
      res.send(user)
      
  }catch (error){
      console.log(error)
      res.status(400).send(error)
  }
};

module.exports = { createUser, loginUser}
