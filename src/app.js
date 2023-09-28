const express = require("express");
const cors = require("cors");
const routes = require("./routes/v1");
const {
  unknownRequestErrorHandler,
  finalErrorHandler,
} = require("./middleware/error");
const APIError = require("./utils/APIError");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());

// Nesting all routes within a /v1 path
app.use("/v1", routes);
app.use(unknownRequestErrorHandler);
// This must be last
app.use(finalErrorHandler);

module.exports = app;
