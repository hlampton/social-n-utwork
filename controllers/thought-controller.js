const { Thought, User } = require('../models');

const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find().sort({ _id: -1 }).select('-__v');
    res.json(thoughts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getThoughtById = async (req, res) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findOne({ _id: thoughtId }).select('-__v');
    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

const addThought = async (req, res) => {
  const { userId } = req.params;
  const { thoughtText } = req.body;
  try {
    const thought = await Thought.create({ thoughtText });
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { thoughts: thought._id } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'No user found with this id!' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

const removeThought = async (req, res) => {
  const { thoughtId } = req.params;
  try {
    const deletedThought= await Thought.findOneAndDelete({ _id: thoughtId });
if (!deletedThought) {
return res.status(404).json({ message: 'No thought found with this id!' });
}
const user = await User.findOneAndUpdate(
{ thoughts: thoughtId },
{ $pull: { thoughts: thoughtId } },
{ new: true }
);
res.json(user);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server Error' });
}
};

const addReaction = async (req, res) => {
const { thoughtId } = req.params;
const { reactionBody, username } = req.body;
try {
const thought = await Thought.findOneAndUpdate(
{ _id: thoughtId },
{ $push: { reactions: { reactionBody, username } } },
{ new: true }
);
if (!thought) {
return res.status(404).json({ message: 'No thought found with this id!' });
}
res.json(thought);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server Error' });
}
};

const removeReaction = async (req, res) => {
const { thoughtId, reactionId } = req.params;
try {
const thought = await Thought.findOneAndUpdate(
{ _id: thoughtId },
{ $pull: { reactions: { reactionId } } },
{ new: true }
);
res.json(thought);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server Error' });
}
};

module.exports = {
getAllThoughts,
getThoughtById,
addThought,
removeThought,
addReaction,
removeReaction,
};
