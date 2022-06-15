const express = require('express');
const userController = require('../controllers/userController');
const itemController = require('../controllers/itemController');
const checkoutController = require('../controllers/checkoutController');
const router = express.Router();

router.post('/signup', userController.createUser, (req, res) => {
  res.status(200).send('Sign up succeed!');
});

router.post(
  '/sell/:userId',
  itemController.postItem,
  userController.updateProductList,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

router.post('/fav', userController.updateFavList, (req, res) => {
  res.status(200).json(res.locals);
});

router.post(
  '/login',
  userController.verifyUser,
  // userController.getProdsAndFavs,
  (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    //if it is verified
    if (res.locals.data) {
      res.status(200).json({
        success: true,
        message: 'Log in succeed!',
        data: res.locals,
      });
    } else {
      //res.status(404).send('Log in failed!');
      res.status(404).json({ success: false, message: 'Log in failed!' });
    }
  }
);

///////////////////////////////////////////// Do these have to be in a different router? /////////////////////////////////////////////

router.get('/', itemController.getAllItems, (req, res) => {
  res.status(200).json(res.locals.items);
});

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

router.post('/updateItem', itemController.updateItem, (req, res) => {
  res.status(200).send('Updated item!');
});

// Still not working
// router.post('/deleteItem'), itemController.deleteItem, (req, res) => {
//   res.status(200).send('Deleted item!')
// }

// router.get('/',
//   starWarsController.getCharacters,
//   (req, res) => res.status(200).json(res.locals.people)
// );

// router.post('/character',
//   starWarsController.addCharacter,
//   (req, res) => res.status(200).json(res.locals.oneCharacter)
// );

router.post(
  '/checkout',
  itemController.findItem,
  checkoutController.createCheckoutSession
);

module.exports = router;
