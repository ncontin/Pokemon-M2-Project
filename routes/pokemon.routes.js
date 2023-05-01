const express = require("express");
const Pokemon = require("../models/Pokemon.model");
const router = express.Router();
const fileUploader = require("../config/cloudinary.config");
const { isLoggedIn } = require("../middleware/route-guard");

router.get("/create", isLoggedIn, (req, res, next) => {
  res.render("pokemon/create", { user: req.session.user });
});

router.post("/create", isLoggedIn, fileUploader.single("url"), async (req, res, next) => {
  try {
    const object = {
      name: req.body.name,
      /* img: req.body.url, */
      img: req.file.path,
      type: req.body.type,
      ability: req.body.ability,
    };
    const newPokemon = await Pokemon.create(object);
    /* console.log(newPokemon); */
    res.render("pokemon/create", { user: req.session.user, message: "Pokemon added successfully!" });
  } catch (error) {
    // Handle any errors that occur
    next(error);
  }
});

router.get("/pokedex", async (req, res) => {
  try {
    const allPokemon = await Pokemon.find();
    /* console.log(allPokemon); */
    res.render("pokemon/pokedex", { allPokemon });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:pokemonId", isLoggedIn, async (req, res, next) => {
  try {
    const pokemon = await Pokemon.findById(req.params.pokemonId);
    console.log(pokemon);
    res.render("pokemon/one", { user: req.session.user, pokemon });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
