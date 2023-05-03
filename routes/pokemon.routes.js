const express = require("express");
const Pokemon = require("../models/Pokemon.model");
const User = require("../models/User.model");
const router = express.Router();
const Comment = require("../models/Comment.model");

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
      user_id: req.session.user.id,
    };
    const newPokemon = await Pokemon.create(object);
    /* console.log(newPokemon); */
    res.render("pokemon/create", {
      user: req.session.user,
      message: "Pokemon added successfully!",
    });
  } catch (error) {
    // Handle any errors that occur
    console.error(error);
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
    const pokemon = await Pokemon.findById(req.params.pokemonId).populate("user_id");
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
router.post("/update/:pokemonId", isLoggedIn, fileUploader.single("url"), async (req, res, next) => {
  try {
    const object = {
      name: req.body.name,

      type: req.body.type,
      ability: req.body.ability,
    };
    if (req.file) {
      object.img = req.file.path;
    }
    const pokemon = await Pokemon.findByIdAndUpdate(req.params.pokemonId, object, { new: true });
    /* console.log(pokemon); */
    res.redirect("/pokemon/" + req.params.pokemonId);
  } catch (error) {
    console.log(error);
  }
});

router.post("/delete/:pokemonId", isLoggedIn, async (req, res) => {
  try {
    await Pokemon.findByIdAndDelete(req.params.pokemonId);
    res.redirect("/pokemon/pokedex");
  } catch (error) {
    console.log(error);
  }
});

router.post("/:pokemonId", isLoggedIn, async (req, res) => {
  try {
    const comment = await Comment.create({
      content: req.body.content,
      pokemon: req.params.pokemonId,
      user_id: req.session.user.id,
    });
    const pokemon = await Pokemon.findById(req.params.pokemonId);
    pokemon.comments.push(comment);
    await pokemon.save();
    /* console.log(comment); */

    res.redirect("/pokemon/" + req.params.pokemonId);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:pokemonId", isLoggedIn, async (req, res, next) => {
  try {
    const pokemon = await Pokemon.findById(req.params.pokemonId).populate("comments");
    console.log(pokemon);
    res.render("pokemon/one", { user: req.session.user, pokemon });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
