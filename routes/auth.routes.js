const express = require("express");
const User = require("../models/User.model");
const router = express.Router();
const bcrypt = require("bcryptjs");

const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

/* GET to display a signup form */
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

/* POST to work with the values of the signup form */
router.post("/signup", async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(13);
    const passwordHash = bcrypt.hashSync(req.body.password, salt);
    const newUser = await User.create({ username: req.body.username, password: passwordHash });
    console.log(newUser);
  } catch (error) {
    console.log(error);
  }
});

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log(user);
    if (!!user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        req.session.user = user;
        console.log(user);
        res.redirect("/main");
      } else {
        // If password is wrong
        res.render("auth/login", { errorMessage: "Wrong password" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
