const express = require('express');
const logger = require('./controllers/logger');
const PORT = 3000;

const app = express();

app.use(express.json());

app.listen(PORT, () => {
  logger.log('info', `server up and running on port : ${PORT}`);
});
