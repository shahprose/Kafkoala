const { instantiate } = require('../models/instantiate');

const topicController = {};

topicController.createTopic = async (req, res, next) => {
  try {
    const { currentAddress } = res.locals;
    const admin = await instantiate(currentAddress);
    const { topic, numPartitions = 1, replicationFactor = 1 } = req.body;
    await admin.createTopics({
      validateOnly: false,
      waitForLeaders: false,
      timeout: 1000,
      topics: [
        {
          topic: topic,
          numPartitions: numPartitions,
          replicationFactor: replicationFactor,
          replicaAssignment: [], // Example: [{ partition: 0, replicas: [0,1,2] }] - default: []
          configEntries: [],
        },
      ],
    });
    return next();
  } catch (err) {
    return next({
      log: `ERROR in createTopic middleware. ${err}`,
      status: 500,
      message: { err: 'Check server log for details' },
    });
  }
};

topicController.deleteTopic = async (req, res, next) => {
  try {
    const { currentAddress } = res.locals;
    const admin = await instantiate(currentAddress);
    const { topic } = req.body;
    await admin.deleteTopics({
      topics: [topic],
      timeout: 1000,
    });
    return next();
  } catch (err) {
    return next({
      log: `ERROR in deleteTopic middleware. ${err}`,
      status: 500,
      message: { err: 'Check server log for details' },
    });
  }
};

// CREATE TOPIC
// await admin.createTopics({
//   validateOnly: false,
//   waitForLeaders: false,
//   timeout: 1000,
//   topics: [
//     {
//       topic: 'market_data',
//       numPartitions: 4,
//       replicationFactor: 0,
//       replicaAssignment: [], // Example: [{ partition: 0, replicas: [0,1,2] }] - default: []
//       configEntries: [],
//     },
//   ],
// });

// adminController.getPartitions = async (req, res, next) => {
//   try {
//     const { currentAddress } = res.locals;
//     const admin = await instantiate(currentAddress);
//     const numberOfPartitions = await admin.fetchTopicMetadata({
//       topics: [req.params.topic],
//     });
//     res.locals.partitions = numberOfPartitions.topics[0].partitions;
//     return next();
//   } catch (err) {
//     return next({
//       log: `ERROR in getPartitions middleware. ${err}`,
//       status: 500,
//       message: { err: 'Check server log for details' },
//     });
//   }
// };

// adminController.getTopicOffsets = async (req, res, next) => {
//   try {
//     const { currentAddress } = res.locals;
//     const admin = await instantiate(currentAddress);
//     const topicOffsets = await admin.fetchTopicOffsets(`${req.params.topic}`);
//     res.locals.offsets = topicOffsets;
//     return next();
//   } catch (err) {
//     return next({
//       log: `ERROR in getTopicOffsets middleware. ${err}`,
//       status: 500,
//       message: { err: 'Check server log for details' },
//     });
//   }
// };

// adminController.getBrokerInfo = async (req, res, next) => {
//   try {
//     const { currentAddress } = res.locals;
//     const admin = await instantiate(currentAddress);
//     const brokerInfo = await admin.describeCluster();
//     const { clusterId, brokers } = brokerInfo;
//     res.locals.clusterId = clusterId;
//     res.locals.brokers = brokers;
//     return next();
//   } catch (err) {
//     return next({
//       log: `ERROR in getBrokerInfo middleware. ${err}`,
//       status: 500,
//       message: { err: 'Check server log for details' },
//     });
//   }
// };

// //
// adminController.getConsumerGroups = async (req, res, next) => {
//   try {
//     const { currentAddress } = res.locals;
//     const admin = await instantiate(currentAddress);
//     const { groups } = await admin.listGroups();
//     res.locals.consumerGroups = groups;
//     return next();
//   } catch (err) {
//     return next({
//       log: `ERROR in getConsumerGroups middleware. ${err}`,
//       status: 500,
//       message: { err: 'Check server log for details' },
//     });
//   }
// };

// adminController.getConsumerMembers = async (req, res, next) => {
//   try {
//     const { currentAddress } = res.locals;
//     const admin = await instantiate(currentAddress);
//     const groupArray = await admin.describeGroups([req.params.groupId]);
//     res.locals.groupMembers = groupArray.groups[0].members;
//     return next();
//   } catch (err) {
//     return next({
//       log: `ERROR in getConsumerMembers middleware. ${err}`,
//       status: 500,
//       message: { err: 'Check server log for details' },
//     });
//   }
// };

module.exports = topicController;
