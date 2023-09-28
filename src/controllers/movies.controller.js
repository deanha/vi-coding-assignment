const catchAsync = require("../utils/catchAsync");
const { movies, actors } = require("../../dataForQuestions");
const APIError = require("../utils/APIError");
const _ = require("lodash");
const getMoviesInfo = require("../services/TMDBService/utils");

const getMoviesByActor = catchAsync(async (req, res) => {
  try {
    const info = await getMoviesInfo(movies);
    const infoByActorName = _.groupBy(info, "actorName");

    const result = actors.reduce((accumulator, actor) => {
      accumulator[actor] = [
        ...new Set(
          (infoByActorName[actor] ?? []).map((info) => info.movieName),
        ),
      ];
      return accumulator;
    }, {});
    res.send(result);
  } catch (error) {
    console.log(error);
    throw APIError.internalServerError;
  }
});

module.exports = { getMoviesByActor };
