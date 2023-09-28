const catchAsync = require("../utils/catchAsync");
const getMoviesInfo = require("../services/TMDBService/utils");
const { movies, actors } = require("../../dataForQuestions");
const APIError = require("../utils/APIError");
const _ = require("lodash");

const getCharactersWithMultiActorsByName = catchAsync(async (req, res) => {
  try {
    const info = await getMoviesInfo(movies);
    const infoByCharacterName = _.groupBy(info, "characterName");

    const result = _.reduce(
      infoByCharacterName,
      (accumulator, info, characterName) => {
        const moreThanOneUniqueActorName =
          Object.keys(_.groupBy(info, "actorName")).length > 1;

        const atLeastOneActorFromList = info.reduce((res, { actorName }) => {
          res ||= actors.includes(actorName);
          return res;
        }, false);

        // NOTE:
        // alongside checking for more than a one unique actor name
        // checking that at least one actor is from the predefined list
        // otherwise will characters of "unknown" actors (i.e not from the fixed data)
        if (moreThanOneUniqueActorName && atLeastOneActorFromList) {
          accumulator[characterName] = info.map(({ movieName, actorName }) => ({
            movieName,
            actorName,
          }));
        }
        return accumulator;
      },
      {},
    );
    res.send(result);
  } catch (error) {
    console.log(error);
    throw APIError.internalServerError;
  }
});

module.exports = { getCharactersWithMultiActorsByName };
