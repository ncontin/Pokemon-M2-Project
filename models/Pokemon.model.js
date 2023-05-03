const { Schema, model } = require("mongoose");
/* title, ingredients list, cooking time, difficulty */
const pokemonSchema = new Schema(
  {
    name: String,
    img: String,
    type: [
      {
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
      type: String,
      required: true,
    },

    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
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
