const path = require('path');

const express = require('express');
const app = express();

const PORT = 3000;

// parsing JSON bodies
app.use(express.json());

// flow check
app.use((req, res, next) => {
  console.log(`
  🌊🌊🌊 FLOW METHOD 🌊🌊🌊\n
  URL: ${req.url}\n
  METHOD: ${req.method}\n`);
  return next();
});

app.get('/', (req, res) => {
  console.log('hello');
  return res.status(200).sendFile(path.join(__dirname, './index.html'));
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ⛵ ${PORT} ⛵`);
}); //listens on port 3000 -> http://localhost:3000/

// module.exports = {app, kafka, admin} ?
