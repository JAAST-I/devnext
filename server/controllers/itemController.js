const Item = require('../models/itemModels');

const itemController = {};

itemController.getAllItems = (req, res, next) => {
  Item.find({}, (err, items) => {
    // if a database error occurs, call next with the error message passed in
    // for the express global error handler to catch
    if (err)
      return next(
        'Error in userController.getAllItems: ' + JSON.stringify(err)
      );

    // store retrieved users into res.locals and move on to next middleware
    res.locals.items = items;
    return next();
  });
};

itemController.postItem = (req, res, next) => {
  const { name, price, details, url, type, username } = req.body;

  Item.create({ name, price, details, url, type, username })
    .then((newItem) => {
      console.log(newItem);
      res.locals.newItem = newItem;
      return next();
    })
    .catch((err) => {
      next({
        log: `itemController.postItem: ERROR: ${err}`,
        err: { err: 'Error occurred in itemController.postItem' },
      });
    });
};

// itemController.findItem = (req, res, next) => {
//     const { name, price, details } = req.body
//     Item.find({name: name})
//         .then(foundItem => {

//             res.locals.item = foundItem
//             res.locals.succsess = true
//             return next()
//             // if (foundItem.length === 0) {

//             // }
//             // else {
//             //     res.locals.success = false
//             //     return next()
//             // }

//         })
//         .catch(err => {
//             next({
//                 log: `itemController.findItem: ERROR: ${err}`,
//                 err:  {err: 'Error occurred in itemController.findItem'}
//             })
//         })
// }

itemController.findItem = async (req, res, next) => {
  try {
    const { itemId } = req.body;
    console.log(itemId);
    const foundItem = await Item.findById(itemId).exec();
    res.locals.foundItem = foundItem;
    next();
  } catch (err) {
    next({
      log: `itemController.findItem: ERROR: ${err}`,
      err: { err: 'Error occurred in itemController.findItem' },
    });
  }
};

itemController.updateItem = (req, res, next) => {
  const { name, price, details, url, type } = req.body;

  Item.updateOne({ name, price, details, url, type })
    .then((updatedItem) => {
      console.log(updatedItem);
      return next();
    })
    .catch((err) => {
      next({
        log: `itemController.updateItem: ERROR: ${err}`,
        err: { err: 'Error occurred in itemController.updateItem' },
      });
    });
};

// itemController.deleteItem = (req, res, next) => {
//     const {name} = req.body

//     Item.deleteOne({name : name})
//         .then(item => {
//             return next()
//         })
//         .catch(err => {
//             next({
//                 log: `itemController.deleteItem: ERROR: ${err}`,
//                 err:  {err: 'Error occurred in itemController.deleteItem'}
//             })
//         })
// }

module.exports = itemController;
