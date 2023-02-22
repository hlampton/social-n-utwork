// Import express Router module
const router = require('express').Router();

// Import thought routes and user routes
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

// Use thought and user routes
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

// Export the router
module.exports = router;

// This code sets up the router for the thoughts and users endpoints. It imports the routes for these endpoints and sets up the router to use them when the endpoint is requested. Finally, it exports the router so it can be used in other parts of the application.