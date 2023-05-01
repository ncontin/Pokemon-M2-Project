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
    type: req.body.type,
    ability: req.body.ability,
  };
  const newPokemon = Pokemon.create(object);
  /* console.log(newPokemon); */
  res.render("pokemon/create", {
    user: req.session.user,
    message: "Pokemon added successfully!",
  });
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

router.get("/update/:pokemonId", isLoggedIn, async (req, res, next) => {
  try {
    const pokemon = await Pokemon.findById(req.params.pokemonId);
    console.log(pokemon);
    res.render("pokemon/update", { user: req.session.user, pokemon });
  } catch (error) {
    console.log(error);
  }
});
router.post("/update/:pokemonId", isLoggedIn, async (req, res, next) => {
  try {
    const object = {
      name: req.body.name,
      img: req.body.url,
      type: req.body.type,
      ability: req.body.ability,
    };
    const pokemon = await Pokemon.findByIdAndUpdate(
      req.params.pokemonId,
      object,
      { new: true }
    );
    console.log(pokemon);
    res.redirect("/pokemon/pokedex");
  } catch (error) {
    console.log(error);
  }
});

router.post("/delete/:pokemonId/", async (req, res) => {
  try {
    await Pokemon.findByIdAndDelete(req.params.pokemonId);
    res.redirect("/pokemon/pokedex");
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
