const axios = require("axios");
const APIError = require("../../utils/APIError");
const config = require("../../config/config");

class TMDBService {
  #apiKey;
  #language;

  constructor(apiKey, language = "en-US") {
    this.apiKey = apiKey;
    this.language = language;
  }

  async getMovieCredits(movieId) {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${movieId}/credits?language=${this.language}&api_key=${this.apiKey}`,
      headers: {
        accept: "application/json",
      },
    };

    try {
      const { data } = await axios.request(options);
      return data;
    } catch (error) {
      throw APIError.internalServerError;
    }
  }
}

let tmdbService;
const getTMDBService = () => {
  if (!tmdbService) {
    console.log("Initializing TMDB service...");
    tmdbService = new TMDBService(config.tmdb.apiKey);
  }
  return tmdbService;
};

module.exports = getTMDBService();
