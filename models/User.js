const { Schema, model } = require('mongoose');

// Regular expression to validate email format
const validateEmail = (validEmail) => {
  return /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z]{2,6})(\.[a-z]{2,6})?$/.test(validEmail);
};

// Define user schema
const UserSchema = new Schema({
  // Username of the user
  username: {
    type: String,
    unique: true, // Username must be unique
    required: [true, 'We need to know what to call you, please enter a user name'], // Username is required
    trim: true // Remove whitespace from username
  },
  // Email of the user
  email: {
    type: String,
    required: [true, 'Please enter a valid email address'], // Email is required
    unique: true, // Email must be unique
    validate: [validateEmail, 'Please enter a valid email address'] // Email must be in a valid format
  },
  // Thoughts of the user, stored as an array of object IDs referencing the Thought model
  thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
  // Friends of the user, stored as an array of object IDs referencing the User model
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
},
{
  // Set options for toJSON() function
  toJSON: { virtuals: true, getters: true },
  // Do not include the id in the returned JSON
  id: false
});

// Define virtual field for the friendCount of the user
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// Create the User model from the UserSchema
const User = model('User', UserSchema);

// Export the User model
module.exports = User;
