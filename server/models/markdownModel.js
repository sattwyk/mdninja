const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const markdownSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('markdown', markdownSchema);
