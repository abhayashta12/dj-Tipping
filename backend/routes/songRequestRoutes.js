const express = require('express');
const {
  createSongRequest,
  updateRequestStatus,
  getVenueRequests,
} = require('../controllers/songRequestController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create a song request (protected route)
router.post('/', authMiddleware, createSongRequest);

// Update a song request status by ID (protected route)
router.put('/:id/status', authMiddleware, updateRequestStatus);

// Get all song requests for a specific venue
router.get('/venue/:venueId', getVenueRequests);

module.exports = router;
