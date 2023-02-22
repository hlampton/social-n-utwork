// Import Mongoose modules
const { Schema, model, Types } = require('mongoose');
// Import dateFormat utility
const dateFormat = require('../utils/dateFormat');

// Define Reaction schema
const ReactionSchema = new Schema({
reactionId: {
type: Schema.Types.ObjectId,
default: () => new Types.ObjectId(),
},
reactionBody: {
type: String,
required: [true, 'Please Enter Your Reaction!'],
maxlength: [280, 'Reaction cannot exceed 280 characters.'],
},
username: {
type: String,
required: [true, 'Please Enter a name'],
trim: true,
},
createdAt: {
type: Date,
default: Date.now,
// Apply dateFormat utility to createdAt
get: createdAtVal => dateFormat(createdAtVal),
},
});

// Define Thought schema
const ThoughtSchema = new Schema({
username: {
type: String,
required: [true, 'Please Enter a name'],
trim: true,
},
thoughtText: {
type: String,
required: [true, 'Please enter your thoughts in the form of text'],
minlength: [1, 'Thought must be at least 1 character.'],
maxlength: [280, 'Thought cannot exceed 280 characters.'],
},
createdAt: {
type: Date,
default: Date.now,
// Apply dateFormat utility to createdAt
get: createdAtVal => dateFormat(createdAtVal),
},
reactions: [ReactionSchema],
}, {
toJSON: {
getters: true,
virtuals: true,
},
// Remove id field from virtual representation
id: false,
});

// Define virtual reactionCount on Thought schema
ThoughtSchema.virtual('reactionCount').get(function () {
return this.reactions.length;
});

// Create Thought model from Thought schema
const Thought = model('Thought', ThoughtSchema);

// Export Thought model
module.exports = Thought;