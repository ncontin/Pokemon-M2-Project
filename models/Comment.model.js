const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  pokemon: {
    type: Schema.Types.ObjectId,
    ref: "Pokemon",
  },

  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
