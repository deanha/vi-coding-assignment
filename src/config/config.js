const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");
const { NODE_ENV_TYPE } = require("./utils");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid(...Object.values(NODE_ENV_TYPE))
      .required(),
    PORT: Joi.number().default(3000),
    TMDB_API_KEY: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  tmdb: {
    apiKey: envVars.TMDB_API_KEY,
  },
};
