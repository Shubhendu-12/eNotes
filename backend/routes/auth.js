const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWR_SECRET = "Rajpas@123";

const { body, validationResult } = require("express-validator");

// ROUTE 1: Create a User using: POST "/api/auth/createUser". It doesn't requires authentication and No Login required

router.post(
  "/createUser",
  [
    body("name").trim().notEmpty().withMessage("Enter a name"),
    body("email").isEmail().trim().notEmpty().withMessage("enter valid email"),
    body("password")
      .isLength({ min: 5, max: 15 })
      .trim()
      .notEmpty()
      .withMessage("Enter valid password"),
  ],
  async (req, res) => {
    //  console.log(req.body);
    //  const user = User(req.body);
    //  user.save()  //  saves the data in MongoDB database(this is custom command below is command copied from express validator website)

    const errors = validationResult(req);
    // If there are error, Return Bad request and Errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //   res.status(200).json({msg:"Form is validated"})
    // Check whether the user with this email already exists
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry user with same email already exists" });
      }
      // bcrypt hashing code below
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      }); // .then(user => res.json(user)); or res.json(user)
      const data = {
        id: user.id,
      };
      const authtoken = jwt.sign(data, JWR_SECRET);
      // console.log(authtoken);
      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE 2: Authenticate a User using : POST "api/auth/login". No login required

router.post(
  "/login",
  [
    body("email").isEmail().trim().notEmpty().withMessage("enter valid email"),
    body("password")
      .isLength({ min: 5, max: 15 })
      .trim()
      .notEmpty()
      .withMessage("Enter valid password"),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    // If there are error, Return Bad request and Errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //  Extract email and password out of user
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct credentials" });
      }
      const data = {
        id: user.id,
      };
      const authtoken = jwt.sign(data, JWR_SECRET);
      // console.log(authtoken);
      success = true;
      res.json({success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 3: Get loggedin user details using POST "/api/auth/getuser"

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    var userId = req.user.id;
    // req.user exported from fetchuser.js
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
