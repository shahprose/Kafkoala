const { Kafka, logLevel } = require('kafkajs');
const fs = require('fs');

const winston = require('winston');

const toWinstonLogLevel = (level) => {
  switch (level) {
    case logLevel.ERROR:
    case logLevel.NOTHING:
      return 'error';
    case logLevel.WARN:
      return 'warn';
    case logLevel.INFO:
      return 'info';
    case logLevel.DEBUG:
      return 'debug';
  }
};

const WinstonLogCreator = (logLevel) => {
  const logger = winston.createLogger({
    level: toWinstonLogLevel(logLevel),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'myKafkaLog.log' }),
    ],
  });

  return ({ namespace, level, label, log }) => {
    const { message, ...extra } = log;
    logger.log({
      level: toWinstonLogLevel(level),
      message,
      extra,
    });
  };
};

const kafka = new Kafka({
  clientId: 'kafka-specks',
  brokers: ['localhost:9092'],
  logLevel: logLevel.INFO,
  logCreator: WinstonLogCreator,
});

// to verify that messages are being sent to the kafka broker, create a consumer to
const consumer = kafka.consumer({ groupId: 'test-group' });
const consumer2 = kafka.consumer({ groupId: 'test-group' });

const consume = async () => {
  console.log('consumer connecting...');
  await consumer.connect();
  console.log('consumer connected!');

  // await consumer2.connect();
  // console.log('consumer2 connected!');

  await consumer.subscribe({
    topic: 'TRUCK_ENGINE_SENSORS',
    fromBeginning: true,
  });
  // await consumer2.subscribe({
  //   topic: 'TRUCK_ENGINE_SENSORS',
  //   fromBeginning: true,
  // });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      consumer.logger().info(`${topic}`);
      console.log('this is the message', {
        topic,
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });

  // await consumer2.run({
  //   eachMessage: async ({ topic, partition, message }) => {
  //     console.log('consumer 2 consumin', {
  //       partition,
  //       offset: message.offset,
  //       value: message.value.toString(),
  //     });
  //   },
  // });

  // //
  const eachMessage = async ({ /*topic, partition,*/ message }) => {
    // From Kafka's perspective, both key and value are just bytes
    // so we need to parse them.
    console.log({
      key: message.key.toString(),
      value: JSON.parse(message.value.toString()),
    });

    /**
     * { key: 'my-key', value: { some: 'data' } }
     */
  };
};

try {
  consume();
} catch (err) {
  console.error(err);
}
