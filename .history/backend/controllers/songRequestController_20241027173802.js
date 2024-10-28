const SongRequest = require('../models/SongRequest');

// Create a song request
exports.createSongRequest = async (req, res) => {
  try {
    const { songName, tipAmount, dj, venue } = req.body;
    const songRequest = new SongRequest({
      songName,
      tipAmount,
      user: req.user.id,
      dj,
      venue,
    });
    await songRequest.save();
    res.status(201).json(songRequest);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update song request status
exports.updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const songRequest = await SongRequest.findById(req.params.id);
    if (!songRequest) {
      return res.status(404).json({ message: 'Song request not found' });
    }

    songRequest.status = status;
    await songRequest.save();
    res.json(songRequest);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all song requests for a venue
exports.getVenueRequests = async (req, res) => {
  try {
    const { venueId } = req.params;
    const requests = await SongRequest.find({ venue: venueId, status: 'pending' });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
