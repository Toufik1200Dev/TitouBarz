// API Configuration - Updated for Render backend deployment
export const API_CONFIG = {
  // Production backend URL (Render) - Latest deployment
  PRODUCTION_URL: 'https://titoubarz.onrender.com/api',
  
  // Development backend URL (localhost)
  DEVELOPMENT_URL: 'http://localhost:5000/api',
  
  // Get the appropriate URL based on environment
  getBaseURL: () => {
    if (import.meta.env.PROD) {
      return API_CONFIG.PRODUCTION_URL;
    }
    return API_CONFIG.DEVELOPMENT_URL;
  }
};

export default API_CONFIG;
