const router = require('express').Router();

// Import all of the API routes from ./api/index.js
const apiRoutes = require('./api');

// Add prefix of '/api' to all of the api routes imported from the 'api' directory
router.use('/api', apiRoutes);

// If no API routes are hit, send 404 error message
router.use((req, res) => {
  res.status(404).send('<h1> 404 Error</h1>');
});

module.exports = router;
