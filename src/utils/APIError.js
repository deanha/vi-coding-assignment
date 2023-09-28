const httpStatus = require("http-status");

class APIError extends Error {
  constructor(statusCode, message, stack = "") {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static get notFound() {
    return new APIError(httpStatus.NOT_FOUND, "Not found");
  }

  static get internalServerError() {
    return new APIError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal server error",
    );
  }
}

module.exports = APIError;
