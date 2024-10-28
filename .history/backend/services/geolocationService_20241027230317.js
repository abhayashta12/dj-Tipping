/**
 * Calculates the distance between two geographic coordinates using the Haversine formula.
 * @param {Object} coord1 - First coordinate { latitude, longitude }.
 * @param {Object} coord2 - Second coordinate { latitude, longitude }.
 * @returns {number} - Distance in kilometers.
 */
const calculateDistance = (coord1, coord2) => {
    const toRadians = (degree) => (degree * Math.PI) / 180;
  
    const R = 6371; // Radius of Earth in kilometers
    const dLat = toRadians(coord2.latitude - coord1.latitude);
    const dLon = toRadians(coord2.longitude - coord1.longitude);
  
    const lat1 = toRadians(coord1.latitude);
    const lat2 = toRadians(coord2.latitude);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c; // Distance in kilometers
  };
  
  /**
   * Checks if a user's location is within a given radius of a venue.
   * @param {Object} userLocation - User's location { latitude, longitude }.
   * @param {Object} venueLocation - Venue's location { latitude, longitude }.
   * @param {number} radius - Radius in kilometers.
   * @returns {boolean} - True if within radius, false otherwise.
   */
  const isWithinRadius = (userLocation, venueLocation, radius) => {
    const distance = calculateDistance(userLocation, venueLocation);
    return distance <= radius;
  };
  
  module.exports = {
    isWithinRadius,
  };
  