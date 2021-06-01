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
    console.log(error);
    res.status(400).send(error);
  }
};
const fetchUsers = async (req, res) => {
  let user = await User.find({});
  return res.status(200).send(user);
};

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
module.exports = { createUser, loginUser, fetchUsers, updateUser };
