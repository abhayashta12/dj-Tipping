const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  paymentMethod: String, // e.g., Stripe or PayPal ID
});

module.exports = mongoose.model('User', userSchema);
