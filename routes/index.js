const router = require("express").Router();
const { isLoggedIn } = require("../middleware/route-guard");
const User = require("../models/User.model");
const Pokemon = require("../models/Pokemon.model");
const Comment = require("../models/Comment.model");
//* GET home page */
router.get("/", (req, res, next) => {
  if (req.session.user) {
    res.redirect("/main");
  }
  res.render("index");
});

router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);
    res.redirect("/");
  });
});

router.get("/main", isLoggedIn, async (req, res) => {
  try {
    // find only the Pokemon that belong to the current user
    const allPokemon = await Pokemon.find({ user_id: req.session.user.id });
    /* console.log(allPokemon); */
    // pass both the user and allPokemon variables to the main template
    res.render("main", { user: req.session.user, allPokemon });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
