const tmdbService = require("./TMDBService");
const _ = require("lodash");

const getMoviesInfo = async (movies) =>
  _.flatMap(
    await Promise.all(
      Object.entries(movies).map(async ([movieName, movieId]) => {
        const { cast } = await tmdbService.getMovieCredits(movieId);
        return cast.reduce(
          (
            accumulator,
            {
              name: actorName,
              character: characterName,
              known_for_department: knownForDepartment,
            },
          ) => {
            if (knownForDepartment === "Acting") {
              accumulator = [
                ...accumulator,
                { actorName, movieName, characterName },
              ];
            }
            return accumulator;
          },
          [],
        );
      }),
    ),
  );

module.exports = getMoviesInfo;
