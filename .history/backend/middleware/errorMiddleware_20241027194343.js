/**
 * Custom error handling middleware.
 * Catches errors and returns a JSON response with the status and message.
 */
const errorMiddleware = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Default to 500 if status code not set
    res.status(statusCode).json({
      message: err.message || 'Internal Server Error',
      // Provide stack trace in development mode for easier debugging
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  };
  
  module.exports = errorMiddleware;
  