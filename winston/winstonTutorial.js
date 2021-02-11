const winston = require('winston');
const fs = require('fs');
const path = require('path');

// const options = {
//   file: {
//     level: 'info',
//     filename: `app.log`,
//     handleExceptions: true,
//     json: true,
//     maxsize: 5242880, // 5MB
//     maxFiles: 5,
//     colorize: false,
//   },
//   console: {
//     level: 'debug',
//     handleExceptions: true,
//     json: false,
//     colorize: true,
//   },
// };

// const logger = winston.createLogger({
//   transports: [new winston.transports.File(options.file)],
//   // transports: [new winston.transports.Console(options.console)],
// });

// color-message
// const logger = (module.exports = winston.createLogger({
//   transports: [new winston.transports.Console()],
//   format: winston.format.combine(
//     winston.format.colorize({ all: true }),
//     winston.format.simple()
//   ),
// }));

// create file stream
const filePath = path.join(__dirname, 'created-logfile.log');
const stream = fs.createWriteStream(filePath);

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.Stream({ stream }),
  ],
});

setInterval(() => {
  logger.log({ level: 'info', message: 'foo' });
  logger.log({ level: 'info', message: 'bar' });
}, 1000);

// for (let i = 0; i < 100; i++) {
//   logger.log('info', 'Hello created log files!', { foo: 'bar' });
// }

// logger.info('What rolls down stairs');
// logger.info('alone or in pairs,');
// logger.info('and over your neighbors dog?');
// logger.warn('Whats great for a snack,');
// logger.info('And fits on your back?');
// logger.error('Its log, log, log');
