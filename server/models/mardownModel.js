const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const markdownSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const markdownModel = mongoose.model('Markdown', markdownSchema);

module.exports = markdownModel;
