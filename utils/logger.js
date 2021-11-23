const {
    createLogger,
    format,
    transports
  } = require('winston')
  const {
    combine,
    timestamp,
    label,
    printf,
    colorize
  } = format
  
  const myFormat = printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
  })
  
  const logger = createLogger({
    format: combine(
      label({ label: 'x-code' }),
      timestamp(),
      colorize(),
      myFormat
    ),
    transports: [
      new transports.Console(),
      new transports.File({
        filename: './logs/combined.log'
      })
    ],
    exceptionHandlers: [
      new transports.Console(),
      new transports.File({
        filename: './logs/exceptions.log'
      })
    ],
    exitOnError: false
  })
  
  module.exports = logger