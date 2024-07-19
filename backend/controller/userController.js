const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerConroller = async (req, res) => {
  try {
    const { username, fullname, password, confirmpassword, gender } = req.body;
    if (!username || !fullname || !password || !confirmpassword || !gender) {
      return res.status(403).send({
        success: false,
        message: "Please enter required information",
      });
    }
    if (password !== confirmpassword) {
      return res.status(403).send({
        success: false,
        message: "password and confirmpassword do not match",
      });
    }
    const user = await userModel.findOne({ username });
    if (user) {
      return res.status(403).send({
        success: false,
        message: "user already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const boypic = `https://robohash.org/${username}`;

    const newUser = await userModel.create({
      username,
      fullname,
      password: hashPassword,
      gender,
      profilepic: boypic,
    });
    return res.status(200).send({
      success: true,
      message: "user created successfully",
      // newUser,
    });
  } catch (error) {
    console.log(error);
  }
};
const loginConroller = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(401).send({
        success: false,
        message: "enter required information",
      });
    }
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "invalid username or password",
      });
    }
    const isMatchpassword = await bcrypt.compare(password, user.password);
    if (!isMatchpassword) {
      return res.status(401).send({
        success: false,
        message: "invalid username or password",
      });
    }

    const tokendata = {
      userId: user._id,
    };

    const token = await jwt.sign(tokendata, process.env.JWT_SECRATE, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .send({
        success: true,
        message: "user login successful",
        userId: user._id,
        username: user.username,
        fullname: user.fullname,
        gender: user.gender,
        profilepic: user.profilepic,
      });
  } catch (error) {
    console.log(error);
  }
};
const logoutConroller = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).send({
      success: true,
      message: "user logged out",
    });
  } catch (error) {
    console.log(error);
  }
};
const otherusersConroller = async (req, res) => {
  try {
    const loginUser = req.id;
    const otherUsers = await userModel
      .find({ _id: { $ne: loginUser } })
      .select("-password");
    return res.status(200).send({
      success: true,
      message: "get other users",
      otherUsers,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerConroller,
  loginConroller,
  logoutConroller,
  otherusersConroller,
};
