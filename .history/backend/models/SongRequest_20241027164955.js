const mongoose = require('mongoose');

const songRequestSchema = new mongoose.Schema({
  songName: {
    type: String,
    required: true,
    trim: true,
  },
  tipAmount: {
    type: Number,
    required: true,
    min: 1,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'playing', 'completed'],
    default: 'pending',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dj: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DJ',
    required: true,
  },
  venue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('SongRequest', songRequestSchema);
