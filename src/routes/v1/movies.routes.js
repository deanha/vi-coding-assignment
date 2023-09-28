const express = require("express");
const moviesController = require("../../controllers/movies.controller");

const router = express.Router();

router.route("/").get(moviesController.getMoviesByActor);

module.exports = router;
