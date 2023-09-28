const express = require("express");
const moviesRoute = require("./movies.routes");
const actorsRoute = require("./actors.routes");
const charactersRoute = require("./characters.routes");

const router = express.Router();

const routesInfo = [
  {
    path: "/moviesPerActor",
    route: moviesRoute,
  },
  {
    path: "/actorsWithMultipleCharacters",
    route: actorsRoute,
  },
  {
    path: "/charactersWithMultipleActors",
    route: charactersRoute,
  },
];

routesInfo.forEach(({ path, route }) => {
  router.use(path, route);
});

module.exports = router;
