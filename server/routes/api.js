const express = require('express');
const userController = require('../controllers/userController');
const itemController = require('../controllers/itemController');
const checkoutController = require('../controllers/checkoutController');
const router = express.Router();

/**
 * Route get request to '/' through itemController.getAllItems middleware. Add "items" to response object.
 */
 router.get('/', 
 itemController.getAllItems,
 (req, res) => {
   res.status(200).json(res.locals.items);
});

/**
 * Route post requests to /signup through the userController.createUser middleware
 */
router.post('/signup', 
  userController.createUser,
  (req, res) => {
    res.status(200).send('Sign up successful!');
});

/**
 * Route post request to /login through userController.verifyUser middleware, if verified, set success to true. Else, set success to false.
 */
 router.post(
  '/login',
  userController.verifyUser,
  // userController.getProdsAndFavs,
  (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    if (res.locals.data) {
      res.status(200).json({
        success: true,
        message: 'Log in succeed!',
        data: res.locals,
      });
    } else {
      res.status(404).json({ success: false, message: 'Log in failed!' });
    }
  }
);

/**
 * Route post request to /sell/:userId through itemController.postItem & userController.updateProductList middleware
 */
router.post(
  '/sell/:userId',
  itemController.postItem,
  userController.updateProductList,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

/**
 * Route post request to /favs through userController.getProductsAndFavItems middleware. Adds res.locals to response object. 
 */
router.post('/favs',
  userController.getProductsAndFavItems, 
  (req, res) => {
    res.status(200).json(res.locals);
  })

/**
 * Route patch request to /favs through userController.updateFavList middleware. Adds res.locals to response object. 
 */
router.patch('/favs', 
  userController.updateFavList,
  (req, res) => {
    res.status(200).json(res.locals);
});

/**
 * Route delete request to /favs through userController.deleteFavListItem middleware. Adds res.locals to response object. 
 */
router.delete('/favs', 
  userController.deleteFavListItem,
  (req, res) => {
    res.status(200).json('Favorite item removed!');
});

/**
 * Route post request to /favs through userController.getCart middleware. Adds res.locals to response object. 
 */
 router.post('/cart',
 userController.getCart, 
 (req, res) => {
   res.status(200).json(res.locals);
 })

/**
* Route patch request to /favs through userController.updateCartList middleware. Adds res.locals to response object. 
*/
router.patch('/cart', 
 userController.updateCartList,
 (req, res) => {
   res.status(200).json(res.locals);
});

/**
* Route delete request to /favs through userController.deleteCartListItem middleware. Adds res.locals to response object. 
*/
router.delete('/cart', 
 userController.deleteCartListItem,
 (req, res) => {
   res.status(200).json('Cart item deleted!');
});


/**
 * Route post request to '/updateItem' through itemController.updateItem middleware.
 */
router.post('/updateItem', 
  itemController.updateItem,
  (req, res) => {
    res.status(200).send('Updated item!');
});

/**
 * Route post request to '/checkout' through itemController.findItem and checkoutController.createCheckoutSession middleware. (? No response object ?)
 */
router.post(
  '/checkout',
  itemController.findItem,
  checkoutController.createCheckoutSession,
  (req, res) => {
    res.json(res.locals.responseURL);
});

module.exports = router;

///////////////////////// REVIEW IF USEFUL ////////////////////////
// router.post('/sell', itemController.postItem, (req, res) => {
//   res.status(200).send('Item post succeeded!');
// });

// still not working
// router.post('findItem', itemController.findItem, (req, res) => {

//   res.status(200).json(res.locals.item)
//   // res.setHeader("Content-Type","application/json");
//   // //if it is verified
//   // if(res.locals.success)
//   // {
//   //   res.status(200).send(JSON.stringify({success: true,message: 'Found post!'}));
//   // }
//   // else
//   // {
//   //   //res.status(404).send('Log in failed!');
//   //   res.status(404).send(JSON.stringify({success: false,message: 'Could not find post'}));
//   // }
// })

// Still not working
// router.post('/deleteItem'), itemController.deleteItem, (req, res) => {
//   res.status(200).send('Deleted item!')
// }
