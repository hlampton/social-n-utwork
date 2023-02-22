const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// Parse incoming JSON data
app.use(express.json());
// Parse incoming URL-encoded data
app.use(express.urlencoded({ extended: true }));
// Serve static files from the "public" folder
app.use(express.static('public'));

// Import routes from "./routes"
const routes = require('./routes');
// Mount routes on the app
app.use(routes);

// Connect to MongoDB using the Mongoose library
async function connectToMongoDB() {
  try {
    const connectionString = process.env.MONGODB_URI || 'mongodb://localhost/fornite-dubber';
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(' Connected to MongoDB');
  } catch (error) {
    console.error('Unable to connect to MongoDB:', error);
    process.exit(1);
  }
}

// Call the connectToMongoDB function to connect to the database
connectToMongoDB();

// Start the server and listen for incoming requests
const server = app.listen(PORT, () => {
  console.log(` Server listening on http://localhost:${PORT}`);
});

// Export the server object for testing purposes
module.exports = server;
