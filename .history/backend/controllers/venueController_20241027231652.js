// backend/controllers/venueController.js
const { isWithinRadius } = require('../services/geolocationService');
const Venue = require('../models/Venue');

/**
 * Verifies if the user is within a specified radius of the venue.
 * Useful for ensuring that users are physically near the venue before making song requests.
 */
exports.verifyUserLocation = async (req, res) => {
  try {
    const userLocation = req.body.location; // { latitude, longitude }

    // Find the venue by ID
    const venue = await Venue.findById(req.params.venueId);
    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' });
    }

    // Extract the venue's coordinates for comparison
    const venueLocation = {
      latitude: venue.location.coordinates[1],
      longitude: venue.location.coordinates[0],
    };

    // Check if the user is within the 0.5 km radius
    const isNearby = isWithinRadius(userLocation, venueLocation, 0.5);
    if (!isNearby) {
      return res.status(403).json({ message: 'User is not within the required distance of the venue' });
    }

    // User is within the radius
    res.json({ message: 'User is within the venue radius' });
  } catch (error) {
    console.error('Error verifying user location:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
