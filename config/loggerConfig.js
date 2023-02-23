const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.timestamp(),
    format.colorize(),
    format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [new transports.Console()],
});

module.exports = logger;
