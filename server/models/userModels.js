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
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Items',
    },
  ]
});

/**
 * @desc User document model, can query the User collection and use mongoose CRUD methods
 */
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;

// Each User Model in the User Collection is based off of the schema:
// {username, password, products, favs}
