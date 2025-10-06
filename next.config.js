module.exports = {
  // Existing configuration
  // ...

  // Configuration for Next.js API route
  api: {
    // Enable Next.js API route
    enabled: true,

    // Define API routes
    routes: ['/api/register'],
  },

  // Other configuration
  // ...

  // Load environment variables
  env: {
    // Load environment variables from .env file
    files: ['.env'],
  },
};