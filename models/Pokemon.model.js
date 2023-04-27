const { Schema, model } = require("mongoose");
/* title, ingredients list, cooking time, difficulty */
const pokemonSchema = new Schema(
  {
    name: {
      // Name of the Pokemon
      type: String,
      required: true,
      unique: true,
    },
    type: [
      {
        // One or two types of the Pokemon
        type: String,
        enum: [
          "Bug",
          "Dark",
          "Dragon",
          "Electric",
          "Fairy",
          "Fighting",
          "Fire",
          "Flying",
          "Ghost",
          "Grass",
          "Ground",
          "Ice",
          "Normal",
          "Poison",
          "Psychic",
          "Rock",
          "Steel",
          "Water",
        ],
        required: true,
      },
    ],
    ability: {
      // One ability of the Pokemon
      type: String,
      required: true,
    },
    stats: {
      // Six stats of the Pokemon
      hp: {
        type: Number,
        min: 1,
        max: 255,
        required: true,
      },
      attack: {
        type: Number,
        min: 5,
        max: 190,
        required: true,
      },
      defense: {
        type: Number,
        min: 5,
        max: 230,
        required: true,
      },
      spAttack: {
        type: Number,
        min: 10,
        max: 194,
        required: true,
      },
      spDefense: {
        type: Number,
        min: 20,
        max: 230,
        required: true,
      },
      speed: {
        type: Number,
        min: 5,
        max: 180,
        required: true,
      },
    },
    moves: [
      {
        // Four moves of the Pokemon
        type: String,
        required: true,
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Pokemon = model("Pokemon", pokemonSchema);

module.exports = Pokemon;
