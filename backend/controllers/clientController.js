const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");

// method: get
// url: /api/client
// access: privare

exports.getUserClient = async (req, res) => {
  const token = req.cookies.access_token;
  const getInfo = jwt.verify(token, process.env.JWT_KEY);
  const userProfile = await User.findOne({ _id : getInfo.id });

  res.status(201).send(userProfile);
};