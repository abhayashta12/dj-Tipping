const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_KEY); // Use Secret Key from .env
