const { createLogger, format, transports } = require("winston");

const GET_LOGGER = (loggerLevel, loggerPath) =>
  createLogger({
    transports: new transports.File({
      level: loggerLevel,
      filename: loggerPath,
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf((info) => `${info.level}:\t${[info.timestamp]}: ${info.message}`)
      ),
    }),
  });

const INFO_LOGGER = GET_LOGGER("info", "./logs/info.log");
const ERROR_LOGGER = GET_LOGGER("error", "./logs/error.log");

const LOGGER = {
  info: (params) => {
    return INFO_LOGGER.info(params);
  },
  error: (params) => {
    return ERROR_LOGGER.error(params);
  },
};

module.exports = LOGGER;
