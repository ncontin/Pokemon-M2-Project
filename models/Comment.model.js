const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  author: {
    id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
  comment: { type: String, maxlength: 200 },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
