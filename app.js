// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();
const { isLoggedOut, isLoggedIn } = require("./middleware/route-guard");
// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
require("./config/session.config")(app);

// https://stackoverflow.com/questions/23943272/node-js-how-can-i-use-my-local-variable-with-ejs-view
app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  res.locals.path = req.path;
  next();
});

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "Pokemon-M2-Project";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const indexRoutes = require("./routes");
app.use("/", indexRoutes);

const pokemonRoutes = require("./routes/pokemon.routes");
app.use("/pokemon", isLoggedIn, pokemonRoutes);

// auth needs to be added so paste the following lines:
const auth = require("./routes/auth.routes");

app.use("/auth", isLoggedOut, auth);
// ...

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
