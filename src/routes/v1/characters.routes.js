const express = require("express");
const charactersController = require("../../controllers/characters.controller");

const router = express.Router();

router.route("/").get(charactersController.getCharactersWithMultiActorsByName);

module.exports = router;
