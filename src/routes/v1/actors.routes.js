const express = require("express");
const actorsController = require("../../controllers/actors.controller");

const router = express.Router();

router.route("/").get(actorsController.getActorsWithMultiCharactersByName);

module.exports = router;
