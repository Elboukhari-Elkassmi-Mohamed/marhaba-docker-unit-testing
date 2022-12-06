const User = require("../models/usersModel");
const Role = require("../models/roleModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

//nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// method: POST
// url: /api/auth/login
// access: Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).send("email dose not exist");
    }

    const pwdDc = await bcrypt.compare(password, user.password);
    if (!pwdDc) {
      return res.status(401).send("Password incorrect");
    }

    if (user.status != true) {
      return res.status(405).send("Needed email validation ");
    }
    const role = await Role.findOne({ _id: user.role[0] });
    const token = await generateToken(user._id, role);
    if (role && token) {
      res
        .cookie("access_token", token, {
          httpOnly: true,
          // secure: true
        })
        .status(201)
        .json({ token, role });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};





// method: POST
// url: /api/auth/register
// access: Public
exports.register = async (req, res, next) => {
  //check if data Exists
  const { username, password, email } = req.body;
  if (!username || !email || !password) {
    next({ status: 404, message: "filed is empty" });
    return;
  }
  //check for duplicate User(by email)
  const userExists = await User.findOne({ email });
  if (userExists) {
    next({ status: 400, message: "User Already exist " });
    return;
  }

  const roles = await Role.findOne({ role: req.body.role });

  //hashPwd
  const hashpws = await bcrypt.hash(password, await bcrypt.genSalt(10));
  const user = await User.create({
    username,
    email,
    password: hashpws,
    role: roles._id,
    token: crypto.randomBytes(64).toString("hex"),
  });

  //generate token then send it
  if (user) {
    const mailOptions = {
      from: "tkkt382@gmail.com", // sender address
      to: user.email, // list of receivers
      subject: "Subject of your email", // Subject line
      html: `<h1>  ${user.username}!! Thnks for Your regsitration in Our Web Site </h1>
        <h2>  Pls Click on The link 
          <a href="http://${req.headers.host}/api/auth/verfiy-email/${user.token}">validation<button></a> </h2>`,
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) console.log(err);
      else res.status(201).send("info sent to u email account");
    });
  } else {
    next({ status: 400, message: "Invalid user data or somthing went wrong " });
    return;
  }
};

//Validation By email
exports.verfiyEmail = async (req, res) => {
  const validationToken = req.params.token;
  const user = await User.findOne({ token: validationToken });
  if (user) {
    user.token = "null";
    user.status = true;
    await user.save();
    res.send("validated");
    
  } else {
    ("something went wrong in validation email");
  }
};

//Genrete JWT
const generateToken = async (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_KEY, {
    expiresIn: "1d",
  });
};

// method: POST
// url: /api/auth/forgetpassword
// access: Public
exports.forgetPassword = async (req, res) => {
  const email = req.body.email;
  const emailcheck = await User.findOne({ email });
  if (!emailcheck) {
    return res.status(404).send("This email Dose Not Exist");
  }
  const token = await generateToken(emailcheck._id);
  if (emailcheck) {
    const mailOptions = {
      from: "tkkt382@gmail.com", // sender address
      to: emailcheck.email, // list of receivers
      subject: "Reset Your Password", // Subject line
      html: `<h1>  ${emailcheck.username}!! Click On the link to reset Your Password </h1>
        <h2>  Pls Click on The link 
          <a href="http://localhost:${process.env.REACT_PORT}/resetpassword/${token}">resetPassword</a> </h2>`,
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) console.log(err);
      else
        res.status(201).send({
          message: "New Token to reset password sent To Your email account",
        });
    });
  } else {
    next({ status: 400, message: "Invalid user data or somthing went wrong " });
    return;
  }
};

// method: POST
// url: /api/auth/resetPassword/:token
// access: Public
exports.resetPassword = async (req, res) => {
  const token = req.params.token;
  const pwd = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));

  const userInfo = jwt.verify(token, process.env.JWT_KEY);

  const upPwd = await User.updateOne(
    { _id: userInfo.id },
    { $set: { password: pwd } }
  );

  if (upPwd) {
    res.status(201).send("Your Password Got change");
  } else {
    res.status(400).send("some Thing went wrong");
  }

  // res.status(200).send("post to resetpassword done with token " + token);
};

exports.logout = (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json("Logout success");
};
