const { Kafka } = require('kafkajs');

// instantiating the kafkaJS client by pointing it to the broker
const kafka = new Kafka({
  clientId: 'kafka-specks',
  brokers: ['localhost:9092'],
});

// creating a producer
const producer = kafka.producer();

const produce = async () => {
  console.log('producer connecting...');
  await producer.connect();
  console.log('producer connected!');

  const sentMessage = await producer.send({
    topic: 'test-topic',
    messages: [
      { value: 'Hello KafkaJS user!' },
      { value: 'Message 2!' },
      { value: 'Message 3!!!!' },
      { value: 'Message 4!' },
      { value: 'Message 5!' },
      { value: 'Message 6!!!!' },
      // { value: 'Message 3!' },
    ],
  });

  console.log(`Sent Message(s): ${JSON.stringify(sentMessage)}`);
  // await producer.disconnect();
};

try {
  produce();
} catch (err) {
  console.error(err);
}
