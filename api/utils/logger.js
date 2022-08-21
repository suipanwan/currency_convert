const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const default_format = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  // format.align(),
  format.printf(info => `${[info.timestamp]} | ${info.level} | ${info.message}`),
);

const logger = createLogger({
  level: 'info',
  format: default_format,
  defaultMeta: { service: 'user-service' },
  transports: [
    // new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({
      filename: 'logs/server.log',
      maxSize: '20m',
      maxFiles: '3d'
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: default_format,
  }));
}

module.exports = logger;