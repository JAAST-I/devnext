// TODO: STRETCH Feature: add a cart array to each user

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Items',
    },
  ],
  favs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Items',
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
