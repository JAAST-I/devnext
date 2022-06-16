// TODO: Refactor the entire Controller to Async/Await

const User = require('../models/userModels');
const Item = require('../models/itemModels'); // used this in the getProdsAndFavs

/**
 * @type {object}
 * @desc User middleware controller, contains all middleware functions.
 */
const userController = {};

/**
 * @desc Retrieves all users from the database.
 * @returns res.locals.users
 */
userController.getAllUsers = async (req, res, next) => {
  try {
    const foundUsers = await User.find({}).exec();
    res.locals.users = foundUsers;
    return next();

  } catch(error) {
    return next({
      log: 'Error in getAllUsers method in userController!',
      status: 500,
      message: { err: JSON.stringify(error) },
    });
  }
};

/**
 * @desc Creates a user in the database.
 * @returns Nothing.
 */
userController.createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    await User.create({ username, password })
    return next();

  } catch(error) {
    return next({
      log: 'Error in createUser method in userController!',
      status: 500,
      message: { err: JSON.stringify(error) },
    });
  }
};

/**
 * @desc Finds a user and returns their fav list and product list with each item's description
 * @returns an object containing the products and favs properties
 */
 userController.getProductsAndFavItems = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const user = await User.findOne({ id: userId }).exec();

    const userFavList = user.favs.map(async (item) => await Item.findById(item)); 
    const resolvedFavList = await Promise.all(userFavList);

    const userProductList = user.products.map(async (item) => await Item.findById(item)); 
    const resolvedProductList = await Promise.all(userProductList);

    res.locals = { products: resolvedProductList, favs: resolvedFavList };
    return next();
  } catch {
    return next({
      log: 'Error in getFavList method in userController!',
      status: 500,
      message: { err: JSON.stringify(error) },
    })
  }
};
//get productList in favs
//findoneanddelete user's product list

/**
 * @desc Obtain username and password from the request body, locate the appropriate user in the database, and then authenticate the submitted password against the password stored in the database.
 * @returns res.locals.data
 */
userController.verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ username: username, password: password }).exec();

    if (foundUser === null) res.locals.data = false;
    else res.locals.data = foundUser;
    return next();

   } catch(error) {
    return next({
      log: 'Error in verifyUser method in userController!',
      status: 500,
      message: { err: JSON.stringify(error) },
    });
  }
};

/**
 * @desc Obtains a user and updates their list of products in the database.
 * @returns an updated product list stored in res.locals to be destructured in the front-end response.
 */
userController.updateProductList = async (req, res, next) => {
  try {
    const updatedProducts = await User.updateOne({ id: userId }, { $push: { products: res.locals.newItem._id } }).exec();
    res.locals = updatedProducts;
    return next();

  } catch(error) {
    return next({
      log: 'Error in updateProductList method in userController!',
      status: 500,
      message: { err: JSON.stringify(error) },
    })
  }
};

/**
 * @desc Finds a user and updates their list of favorites with the item sent along in the body
 * @returns an updated favorites list stored in res.locals to be destructured in the front-end response.
 */
userController.updateFavList = async (req, res, next) => {
  try {
  const { itemId, userId } = req.body;
  const updatedFavList = await User.updateOne({ id: userId }, { $push: { favs: itemId } }).exec();
    res.locals = updatedFavList;
    return next();
  } catch {
    return next({
      log: 'Error in updateFavList method in userController!',
      status: 500,
      message: { err: JSON.stringify(error) },
    })
  }
};

module.exports = userController;


//Stored, to be used later as development continues.
// user.populate() add new instance of items in array    api/user/sell