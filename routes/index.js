const router = require("express").Router();
const { isLoggedIn } = require("../middleware/route-guard");

//* GET home page */
router.get("/", (req, res, next) => {
  if (req.session.user) {
    res.redirect("/main");
  }
  res.render("index");
});

router.get("/main", isLoggedIn, (req, res, next) => {
  console.log(req.session);
  //render view and user is coming from req.session.user
  res.render("main", { user: req.session.user });
});

router.get("/private", isLoggedIn, (req, res, next) => {
  console.log(req.session);
  //render view and user is coming from req.session.user
  res.render("private", { user: req.session.user });
});

router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);
    res.redirect("/");
  });
});

module.exports = router;
