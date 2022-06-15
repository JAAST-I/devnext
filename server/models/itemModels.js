const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  details: { type: String },
  url: { type: String }, // Image Url
  type: { type: String }, // Product or Service
  username: { type: String }, // the particular user that made the post
});

module.exports = mongoose.model('Items', itemSchema);
