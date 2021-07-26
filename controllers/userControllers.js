let User = require("../models/User");


const createUser = async (req, res) => {
  const user = new User(req.body);
    try {
      await user.save();
      const token = await user.generateAuthToken();
      // res.status(201).send(user);
      res.status(201).send({user, token});

    } catch (error) {
      res.status(400).send(error);
    }
};
//login registered user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();

    res.send({user, token});

  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
};

//logout user from one session
const logOutUser = async (req, res)=>{
  try{
    req.user.tokens = req.user.tokens.filter((token)=>{
      return token.token !== req.token
    })
    await req.user.save();
    res.send();

  }catch(e){
    console.log(e)
    res.status(500).send(e);
  }
}

//logout of all sessions
const logOutAll = async (req, res)=>{
  try{
    req.user.tokens = []
    await req.user.save()
    res.send()
  }catch(e){
    res.status(500).send()
  }

};

//fetch user profile
const fetchUser = async (req, res) => {
    res.send(req.user);
};

//edit user information
const updateUser = async (req, res) => {

  const updates = Object.keys(req.body);
  const allowedUpdates = ['fullName', 'password', 'bio'];
  const isValidOperation = updates.every((update)=>allowedUpdates.includes(update));

  if(!isValidOperation){
    return res.status(400).send({error: 'Invalid Updates. Email cannot be updated'});
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    res.send({
      message: "user updated successfully!",
      data: req.user
    });
  } catch (e) {
    res.status(400).send(e);
  }
};
//delete user profile
const deleteUser = async(req, res) =>{
  try{

    await req.user.remove()
    res.send({message: `Account ${req.user.fullName} has been sucessfully deleted`});

  }catch(e){
      res.status(400).send()
  }
 
};
//fetch all users
const fetchAllUsers = async(req, res) =>{
  try{
      let users = await User.find({})
      return res.status(200).send(users);
  }catch(e){
      console.log(e)
      res.status(500).send(e)
  }
};

module.exports = { createUser, loginUser, fetchUser, updateUser, deleteUser, logOutUser , logOutAll, fetchAllUsers};
