const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'], // GeoJSON type for location data
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  approvedSongs: {
    type: [String], // List of song names that are pre-approved for requests
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

venueSchema.index({ location: '2dsphere' }); // Geospatial index for location-based queries

module.exports = mongoose.model('Venue', venueSchema);
