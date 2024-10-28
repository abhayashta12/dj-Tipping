const { createPaymentIntent } = require('../services/paymentService');
const SongRequest = require('../models/SongRequest');

/**
 * Creates a song request with payment processing.
 * A payment intent is generated, and the request is saved in the database.
 */
exports.createSongRequest = async (req, res) => {
  try {
    const { songName, tipAmount, dj, venue } = req.body;

    // Convert tipAmount to cents for Stripe (e.g., $5 becomes 500 cents)
    const paymentIntent = await createPaymentIntent(tipAmount * 100);

    // Create a new song request document
    const songRequest = new SongRequest({
      songName,
      tipAmount,
      user: req.user.id,
      dj,
      venue,
      paymentIntentId: paymentIntent.id, // Store Stripe paymentIntent ID
    });

    // Save the song request to the database
    await songRequest.save();

    // Respond with the created song request and payment client secret
    res.status(201).json({
      songRequest,
      clientSecret: paymentIntent.client_secret, // Required by frontend for completing the payment
    });
  } catch (error) {
    console.error('Error creating song request:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};