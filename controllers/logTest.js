// const { logLevel, Kafka } = require('kafkajs');
// const { log } = require('winston');
// const winston = require('winston');

// const toWinstonLogLevel = (level) => {
//   switch (level) {
//     case logLevel.ERROR:
//     case logLevel.NOTHING:
//       return 'error';
//     case logLevel.WARN:
//       return 'warn';
//     case logLevel.INFO:
//       return 'info';
//     case logLevel.DEBUG:
//       return 'debug';
//   }
// };

// const WinstonLogCreator = (logLevel) => {
//   const logger = winston.createLogger({
//     level: toWinstonLogLevel(logLevel),
//     transports: [
//       new winston.transports.Console(),
//       new winston.transports.File({ filename: 'myapp.log' }),
//     ],
//   });

//   return ({ namespace, level, label, log }) => {
//     const { message, ...extra } = log;
//     logger.log({
//       level: toWinstonLogLevel(level),
//       message,
//       extra,
//     });
//   };
// };

// const kafka = new Kafka({
//   clientId: 'my-app',
//   brokers: ['localhost:9092'],
//   logLevel: logLevel.ERROR,
//   logCreator: WinstonLogCreator,
// });

// kafka.logger().info();
