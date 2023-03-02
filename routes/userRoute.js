const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_TOKEN = "VivekMaddeshiya"

// create a new user
// POST "user/register".

router.post("/register",async (req, res) => {
    const { name,email,password } = req.body;
  
    let user = await User.findOne({ email });
    try {
      if (user) {
        return res
          .status(400)
          .json({ status: "error", msg: "User already exists" });
      }
      user = await User.create({ name,email,password });
      const data = {
        user:{
            email:user.email,
            id:user.id,
            name:user.name
        }
      }
      const token = jwt.sign(data, JWT_TOKEN, {
        expiresIn: 7200
      });
      res.status(201).json({ status: "success", data: { user, token } });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ status: "error", msg: err.message });
    }
  });

// login
// POST "user/login".
router.post("/login",async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email }).select("+password");
  
      if (user && (await bcrypt.compare(password, user.password))) {
        const data = {
            user:{
                email:user.email,
                id:user.id,
                name:user.name
            }
          }
        const token = jwt.sign(data, JWT_TOKEN, {
          expiresIn: 7200
        });
        res.status(200).json({ status: "success", data: { token } });
      } else {
        res.status(400).json({ status: "fail", msg: "Invalid Credentials" });
      }
    } catch (err) {
      res.status(400).json({ status: "fail", msg: err.message });
    }
  });

module.exports = router;