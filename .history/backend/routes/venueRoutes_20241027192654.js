const express = require('express');
const { getVenueDetails } = require('../controllers/venueController');

const router = express.Router();

// Get details of a specific venue
router.get('/:venueId', getVenueDetails);

module.exports = router;
