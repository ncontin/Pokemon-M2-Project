const express = require("express");
const Pokemon = require("../models/Pokemon.model");

const router = express.Router();
const Comment = require("../models/Comment.model");

const { isLoggedIn } = require("../middleware/route-guard");


module.exports = router;
