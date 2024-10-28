const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { initDbConnection } = require('./config/database');

// Route imports
const userRoutes = require('./routes/userRoutes');
const djRoutes = require('./routes/djRoutes');
const songRequestRoutes = require('./routes/songRequestRoutes');
const venueRoutes = require('./routes/venueRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Initialize MongoDB connection
initDbConnection();

// Base route for server health check
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/djs', djRoutes);
app.use('/api/song-requests', songRequestRoutes);
app.use('/api/venues', venueRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
