const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter');
const markdownRouter = require('./routes/markdownRouter');
const cors = require('cors');

require('dotenv').config();

mongoose.connect(
  process.env.NODE_ENV === 'test'
    ? process.env.MONGOURI_TEST
    : process.env.MONGOURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.once('open', () => {
  console.log(`Connected to ${process.env.NODE_ENV} Database 🥳`);
});

const app = express();
const PORT = 3500;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/');

app.use('/user', userRouter);

app.use('/markdown', markdownRouter);

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
