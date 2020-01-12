const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");
/* 
    API    : /api/users/test
    GOAL   : Test route
    METHOD : POST
*/
router.get("/test", (req, res) => {
  res.send("Its Working");
});

/* 
    API    : /api/users/register
    GOAL   : Register a user
    METHOD : POST
*/
router.post("/register", async (req, res) => {
  //  Validate the data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  //  check if email already exist
  const userEmail = await User.findOne({ email: req.body.email });
  if (userEmail) return res.send({ message: "Email Already Exist" });
  //  hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, salt);
  //  save the user
  const user = new User({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    password: hashPass
  });

  const savedUser = await user.save();

  try {
    res.status(200).json({ message: "User Has Been Saved", _id: user._id });
  } catch (error) {
    res.status(500).json(error);
  }
});


/// ADDING THE LOGIN FEATURE
/* 
   **** IF WE CANT TO ADD THE LOGIN FEATURE
    API    : /api/users/register
    GOAL   : Register a user
    METHOD : POST
*/
router.post("/login", async (req, res) => {
  //  Validate the data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  //  check if email does not  exist
  const userEmail = await User.findOne({ email: req.body.email });
  if (!userEmail) return res.send({ message: "Invalid Email !" });
  //  compare password
  const isPassCorrect = await bcrypt.compare(
    req.body.password,
    userEmail.password
  );
  if (!isPassCorrect) return res.send({ message: "Invalid Password !" });

  //create and assign token

  const token = jwt.sign({ _id: userEmail._id }, process.env.TOKEN_SECRET);
  res.header("token", token).json(token);
});

module.exports = router;
