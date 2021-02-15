const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());

const apiRouter = require('./routes/apiRouter');

app.use('/build', express.static(path.join(__dirname, '../build')));

app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/shared/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.error(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app;
