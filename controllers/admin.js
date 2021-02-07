const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'kafka-specks',
  brokers: ['localhost:9092'],
});

const admin = kafka.admin();

const administrate = async () => {
  console.log('admin connecting...');
  await admin.connect();
  console.log('admin connected!');

  // GET CLUSTER INFORMATION
  // - can retrieve an array of brokers with host IP and port info
  // - also shows property 'controller : 0'
  // In a Kafka cluster, one of the brokers serves as the controller, which is responsible for managing the states of partitions and replicas and for performing administrative tasks like reassigning partitions.
  const clusterData = await admin.describeCluster();
  console.log('clusterData ===>', clusterData);

  // DELETE TOPIC
  // await admin.deleteTopics({
  //   topics: [
  //     'TRUCK_ENGINE_SENSORS',
  //     'TRUCK_3_SENSORS',
  //     'TRUCK_2_SENSORS',
  //     'TRUCK_1_SENSORS',
  //   ],
  //   timeout: 1000,
  // });

  // CREATE TOPIC
  // await admin.createTopics({
  //   validateOnly: false,
  //   waitForLeaders: false,
  //   timeout: 1000,
  //   topics: [
  //     {
  //       topic: 'SPECK-TOPIC',
  //       numPartitions: 1,
  //       replicationFactor: 0,
  //       replicaAssignment: [], // Example: [{ partition: 0, replicas: [0,1,2] }] - default: []
  //       configEntries: [],
  //     },
  //   ],
  // });

  const arrayOfTopics = await admin.listTopics();
  console.log('Array of Topics ===>', arrayOfTopics);

  // Lists topics again
  // const arrayOfTopics2 = await admin.listTopics();
  // console.log(arrayOfTopics2);

  // CREATE PARTITIONS
  // await admin.createPartitions({
  //   validateOnly: false,
  //   timeout: 1000, //
  //   topicPartitions: [
  //     {
  //       topic: 'test-topic',
  //       count: 2,
  //       // assignments: [[0]],
  //     },
  //   ],
  // });

  // GET METADATA - CAN SHOW PARTITION ID, POINT TO THE LEADER PARTITION, NUMBER OF PARTITIONS per TOPIC, and REPLICAS
  const metaData = await admin.fetchTopicMetadata({
    topics: ['TRUCK_ENGINE_SENSORS'],
  });
  // for (let i = 0; i < metaData.topics.length; i++) {
  //   if (metaData.topics[i].name !== '__consumer_offsets') {
  //     console.log(`${metaData.topics[i].name}`, metaData.topics[i].partitions);
  //   }
  // }
  console.log(
    'this is topic metadata for a single topic ===>',
    JSON.stringify(metaData)
  );

  // GET GROUPIDS
  // gets us the consumer groups
  const groups = await admin.listGroups();
  console.log('listGroups ===>', groups);

  // GET CONSUMER LIST
  // gets us array of groups, for each group we can drill down to its members
  // maybe look into 'State: 'Stable' property in the group object
  // get us consumers for each group
  const consumers = await admin.describeGroups(['test-group']);
  console.log('consumer group ===>', consumers);
  console.log('members of a group ===>', consumers.groups[0].members);

  // disconnect
  await admin.disconnect();
};

try {
  administrate();
} catch (err) {
  console.error(err);
}
