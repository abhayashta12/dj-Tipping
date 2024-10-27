const express = require('express');
const userRoutes = require('./userRoutes');
const songRequestRoutes = require('./songRequestRoutes');

exports.initRoutes = (app) => {
  app.use('/api/users', userRoutes);
  app.use('/api/song-requests', songRequestRoutes);
};