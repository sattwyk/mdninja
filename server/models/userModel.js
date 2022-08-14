const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  documents: [{ type: Schema.Types.ObjectId, ref: 'markdown' }],
});

module.exports = mongoose.model('user', userSchema);
