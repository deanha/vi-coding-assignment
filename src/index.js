const app = require("./app");
const config = require("./config/config");

app.listen(config.port, () => {
  console.info(`Listening on port ${config.port}`);
});
