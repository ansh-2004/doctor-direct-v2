const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.checkIfUserExist = async (req, res) => {
  try {
    const { name } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Kindly provide complete details.",
      });
    }

    let existedUser = await User.findOne({ name });
    //console.log(existedUser);
    if (!existedUser) {
      return res.status(400).json({
        success: false,
        message: "Sorry!! Kindly signup first.",
      });
    }

    return res.status(400).json({
      success: true,
      message: "Sorry!! Kindly signup first.",
    });
  
  }catch(err){
    return res.status(400).json({
        success:false,
        message:"Error while checking if user exist"
    })
  }
}