const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const token = (user) =>
  jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      res.status(200).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: token(user),
      });
      return;
    }
  }
  res.status(401).send({ message: "Invalid email or password" });
};

const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const { firstName, lastName, email, password, location } = req.body;

    const isExistingUser = await User.exists({ email: email });
    if (isExistingUser) {
      res.status(400).send({ message: "Email already exists" });
      return;
    }
    const newUser = new User({
      name: firstName + " " + lastName,
      email: email,
      password: bcrypt.hashSync(password, salt),
    });
    const user = await newUser.save();
    res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token(user),
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { register, login };
