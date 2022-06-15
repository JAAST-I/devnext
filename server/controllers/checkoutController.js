require('dotenv').config();
// console.log(process.env.STRIPE_PRIVATE_KEY);
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const checkoutController = {};

checkoutController.createCheckoutSession = async (req, res) => {
  try {
    const { foundItem } = res.locals;
    console.log(foundItem);
    const price_in_rupees = foundItem.price * 100;
    // console.log('price_in_cents', price_in_cents);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: foundItem.name,
            },
            unit_amount: price_in_rupees,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:8080/success',
      cancel_url: 'http://localhost:8080/signup',
    });
    console.log(session.url);
    res.json({ url: session.url });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = checkoutController;
