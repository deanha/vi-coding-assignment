const httpStatus = require("http-status");
const config = require("../config/config");
const { NODE_ENV_TYPE } = require("../config/utils");
const APIError = require("../utils/APIError");

const unknownRequestErrorHandler = (req, res, next) => {
  next(APIError.notFound);
};

const finalErrorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.env === NODE_ENV_TYPE.prod) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === NODE_ENV_TYPE.dev && { stack: err.stack }),
  };

  if (config.env === NODE_ENV_TYPE.dev) {
    console.error(err);
  }

  res.status(statusCode).send(response);
};

module.exports = {
  unknownRequestErrorHandler,
  finalErrorHandler,
};
