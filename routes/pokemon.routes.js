const express = require("express");
const Pokemon = require("../models/Pokemon.model");
const router = express.Router();
const { isLoggedIn } = require("../middleware/route-guard");

router.get("/create", isLoggedIn, (req, res, next) => {
  res.render("pokemon/create", { user: req.session.user });
});

router.post("/create", isLoggedIn, (req, res, next) => {
  const object = {
    name: req.body.name,
    img: req.body.url,
  };
  const newPokemon = Pokemon.create(object);
  console.log(newPokemon);
  res.render("pokemon/create", { user: req.session.user, message: "Pokemon added successfully!" });
});

module.exports = router;
