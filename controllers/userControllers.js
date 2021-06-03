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
    res.status(500).send(e);
  }
}

//logout of all sessions
const logOutAll = async (req, res)=>{


};

//fetch user profile
const fetchUser = async (req, res) => {
    res.send(req.user);
};

//edit user information
const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['fullName', 'password'];
  const isValidOperation = updates.every((update)=>allowedUpdates.includes(update));

  if(!isValidOperation){
    return res.status(400).send({error: 'Invalid Updates. Email cannot be updated'});
  }

  try {
    const user = await User.findById(req.params.id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    if (!user) {
      return res
        .status(404)
        .send({ error: "The user you are searching for was not found." });
    }
    res.send({
      message: "user updated successfully!",
      data: user,
    });
  } catch (e) {
    res.status(400).send(e);
  }
};
//delete user profile
const deleteUser = async(req, res) =>{
  try{
      const user = await User.findByIdAndDelete(req.params.id);

      if(!user){
          return res
          .status(404) 
          .send({error: 'Account Does not exist'});
      }

      res.send({message: `User ${user.fullName} has been sucessfully deleted`});

  }catch(e){
      res.status(400).send()
  }
 
};

module.exports = { createUser, loginUser, fetchUser, updateUser, deleteUser, logOutUser };
