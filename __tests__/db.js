const { MongoClient } = require('mongodb');
const { userModel } = require('../server/models/userModels');
// {username, password, products, favs}
const { itemsModel } = require('../server/models/itemModels');
// {name, price, details, url, type, username}

/**
 * @desc @shelf/jest-mongodb allows jest to create a mongo server that can be used as a database
 * @see https://jestjs.io/docs/mongodb
 */

describe('database', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(globalThis.__MONGO_DB_NAME__);
  });
  
  afterAll(async () => {
    await connection.close();
  });
  
  describe('insert', () => {
    it('should insert a doc into users collection', async () => {
    const users = db.collection('users');

    const mockUser = {_id: 'some-user-id', username: 'anthony', password: 'testing', products: [], favs: [], cart: []};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });
  it('should insert a doc into items collection', async () => {
    const users = db.collection('items');

    const mockItem = {_id: 'some-item-id', name: 'Sample Product', price: 20, details: 'some details', url: '/item-location', type: 'product', username: 'anthony'};
    await users.insertOne(mockItem);

    const insertedItem = await users.findOne({_id: 'some-item-id'});
    // {name, price, details, url, type, username}
    expect(insertedItem).toEqual(mockItem);
  });
});  
  xdescribe('update', () => {
    it('should update a doc in the users collection', async () => {
    const users = db.collection('users');
    const updatedProducts = await User.updateOne({ id: userId }, { $push: { products: res.locals.newItem._id } }).exec();

    const mockUser = {_id: 'some-user-id', name: 'John'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });
  it('should update a doc in the items collection', async () => {
    const users = db.collection('items');

    const mockItem = {_id: 'some-user-id', name: 'John'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });
});
  xdescribe('delete', () => {
    it('should delete a doc in the users collection', async () => {
    const users = db.collection('users');

    await User.updateOne({ _id: userId }, { $pull: { 'favs': itemId } } ).exec();

    const mockUser = {_id: 'some-user-id', name: 'John'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });
  it('should delete a doc in the items collection', async () => {
    const users = db.collection('items');

    const mockItem = {_id: 'some-user-id', name: 'John'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });
});
});