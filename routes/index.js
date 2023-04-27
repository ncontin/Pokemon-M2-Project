const router = require("express").Router();
const { isLoggedIn } = require("../middleware/route-guard");

//* GET home page */
router.get("/", (req, res, next) => {
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

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.render("main", { logOutMessage: "Succesfully logged out" });
    }
  });
});

module.exports = router;
