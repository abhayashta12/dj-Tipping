const mongoose = require('mongoose');

/**
 * Initializes the connection to the MongoDB database.
 * Uses the MONGO_URI environment variable from the .env file.
 */
const initDbConnection = async () => {
  try {
    // Connect to MongoDB using the URI from the environment variable
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,      // Ensures use of the new URL string parser
      useUnifiedTopology: true,    // Enables the new Server Discover and Monitoring engine
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = { initDbConnection };
