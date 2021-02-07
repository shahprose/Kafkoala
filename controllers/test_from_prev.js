const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

const admin = kafka.admin();
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'test-group' });

const run = async () => {
  await admin.connect();
  // await admin.deleteTopics({
  //   topics: ['test-topic'],
  //   timeout: 1000,
  // });

  // Producing
  await producer.connect();
  await producer.send({
    topic: 'test-topic',
    messages: [{ value: 'Hello KafkaJS user!' }],
  });

  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });

  // await admin.connect();
  // await admin.listTopics();
  await admin.disconnect();
};

run().catch(console.error);

const listTopics = async () => {
  await admin.connect();

  // DELETE TOPIC
  await admin.deleteTopics({
    topics: ['SPECK-TOPIC'],
    timeout: 1000,
  });

  // CREATE TOPIC
  await admin.createTopics({
    validateOnly: false,
    waitForLeaders: false,
    timeout: 1000,
    topics: [
      {
        topic: 'SPECK-TOPIC',
        numPartitions: 1,
        replicationFactor: 0,
        replicaAssignment: [], // Example: [{ partition: 0, replicas: [0,1,2] }] - default: []
        configEntries: [],
      },
    ],
  });

  const arrayOfTopics = await admin.listTopics();
  console.log(arrayOfTopics);

  // Lists topics again
  // const arrayOfTopics2 = await admin.listTopics();
  // console.log(arrayOfTopics2);

  // CREATE PARTITIONS
  await admin.createPartitions({
    validateOnly: false,
    timeout: 1000, //
    topicPartitions: [
      {
        topic: 'SPECK-TOPIC',
        count: 3,
        assignments: [[0]],
      },
    ],
  });

  // GET METADATA
  // const metaData = await admin.fetchTopicMetadata();
  // console.log(metaData.topics[0].partitions);

  // disconnect
  await admin.disconnect();
};

listTopics().catch(console.error);
