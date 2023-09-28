const catchAsync = require("../utils/catchAsync");
const getMoviesInfo = require("../services/TMDBService/utils");
const { movies, actors } = require("../../dataForQuestions");
const APIError = require("../utils/APIError");
const _ = require("lodash");

const getActorsWithMultiCharactersByName = catchAsync(async (req, res) => {
  try {
    const info = await getMoviesInfo(movies);
    const infoByActorName = _.groupBy(info, "actorName");

    const result = actors.reduce((accumulator, actor) => {
      accumulator[actor] = _.uniqBy(
        (infoByActorName[actor] ?? []).map(({ movieName, characterName }) => ({
          movieName,
          characterName,
        })),
        "characterName",
      );
      return accumulator;
    }, {});
    res.send(result);
  } catch (error) {
    console.log(error);
    throw APIError.internalServerError;
  }
});

module.exports = { getActorsWithMultiCharactersByName };
