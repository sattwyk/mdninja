const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to Database 🥳');
});

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded());

app.listen(PORT, () => {
  console.log(`listening to PORT: ${PORT}`);
});
