const tmdbService = require("./TMDBService");
const _ = require("lodash");

const sanitizedCharacterNames = (characterName) => {
  return characterName
    .split("/")
    .map((str) =>
      str
        .replace("(archive footage / uncredited)", "")
        .replace("(uncredited)", "")
        .trim(),
    );
};

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
                ...sanitizedCharacterNames(characterName).map(
                  (sanitizedCharacterName) => ({
                    actorName,
                    movieName,
                    characterName: sanitizedCharacterName,
                  }),
                ),
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
