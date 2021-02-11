const express = require('express');
const app = express();

const winston = require('winston');

const options = {
  file: {
    level: 'info',
    filename: `app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
};

const logger = winston.createLogger({
  transports: [new winston.transports.File(options.file)],
  // transports: [new winston.transports.Console(options.console)],
});

app.use('/', (req, res) => {
  try {
    logger.info(`${req.method} - server.handler.begun`);
    res.status(200).send('good');
  } catch (e) {
    logger.info(`${req.method} - server.handler.failed`);
    res.status(200).send('bad');
  }
});

app.listen(4200, () => {
  console.log('listening on 4200');
});
