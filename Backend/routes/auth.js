const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET= process.env.JWT_SECRET;

//Route 1 --- Create a user using : POST /api/auth/createuser.
router.post(
  "/createuser",
  [
    body("name", "Enter a name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      res.json(authtoken);
    } catch (err) {
      if (err.code === 11000 && err.keyPattern && err.keyPattern.email === 1) {
        return res.status(400).json({
          error: "Please enter a unique value for email",
          message: err.message,
        });
      } else {
        console.error("Error occurred during user creation:", err);
        return res.status(500).json({ error: "Server error" });
      }
    }
  }
);

//Route 2 -- Authenticate a user using POST : /api/auth/login 

router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password", "password cannot be empty").exists(),
  ],
  async (req, res) => {
    let success = false;
    //If there are errors , return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success=false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success =true;
      res.json({success,authtoken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

//Route 3 -- Get loggedin user details using  using POST  :  /api/auth/getuser . no login required
//user need to provide auth-token in headers

router.post("/getuser", fetchuser, async (req, res) => {
  //If there are errors , return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

module.exports = router;
