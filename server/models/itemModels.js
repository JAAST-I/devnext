const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  details: { type: String },
  url: { type: String },
  type: { type: String },
  username: { type: String },
});

module.exports = mongoose.model('Items', itemSchema);
