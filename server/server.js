const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRouter = require('./routes/api');

require('dotenv').config();

mongoose.connect(
  process.env.NODE_ENV === 'test'
    ? process.env.MONGOURI_TEST // mongoURI test
    : process.env.MONGOURI, // production url
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.once('open', () => {
  console.log(`Connected to ${process.env.NODE_ENV} Database 🥳`);
});

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MAY OR MAY NOT NEED
// app.use(express.urlencoded());
// app.use('/client', express.static(path.resolve(__dirname, '../client')));

app.use('/api/user', apiRouter);

// app.use('/');
app.get('/api', (req, res) => {
  res.status(200).json('Hello World from Server!');
});

app.use('*', (req, res) => {
  res.sendStatus(404);
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
  console.log(`listening to PORT: ${PORT}`);
});

module.exports = app;
