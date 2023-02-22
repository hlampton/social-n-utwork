// This code exports an object containing several controller functions for handling User 
const { User, Thought } = require('../models')

// Function for getting all users from database and populating their thoughts.
const userController = {
  async getAllUsers(req, res) {
    try {
      const dbUserData = await User.find({})
        .populate({
          path: 'thoughts',
          select: '-__v'
        })
        .select('-__v');
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

// Function for getting a single user by their id and populating their thoughts.
  async getUserById({ params }, res) {
    try {
      const dbUserData = await User.findOne({ _id: params.id })
        .populate({
          path: 'thoughts',
          select: '-__v'
        })
        .select('-__v');
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  // Function for creating a new user.
  async createUser({ body }, res) {
    try {
      const dbUserData = await User.create(body);
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
// Function for updating an existing user.
  async updateUser({ params, body }, res) {
    try {
      const dbUserData = await User.findOneAndUpdate({ _id: params.id }, body, {
        new: true,
        runValidators: true
      });
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      res.status(400).json(err);
    }
  },
// Function for deleting an existing user.
  async deleteUser({ params }, res) {
    try {
      const dbUserData = await User.findOneAndDelete({ _id: params.id });
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      await User.updateMany(
        { _id: { $in: dbUserData.friends } },
        { $pull: { friends: params.id } }
      );
      await Thought.deleteMany({ username: dbUserData.username });
      res.json({ message: 'Successfully deleted user' });
    } catch (err) {
      res.status(400).json(err);
    }
  },

// Function for adding a friend to a user's friends list.

  async addFriend({ params }, res) {
    try {
      const dbUserData = await User.findByIdAndUpdate(
        { _id: params.id },
        { $addToSet: { friends: params.friendId } },
        { new: true }
      ).select('-__v');
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  
// Function for removing a friend from a user's friends list.

  async removeFriend({ params }, res) {
    try {
      const dbUserData = await User.findByIdAndUpdate(
        { _id: params.id },
        { $pull: { friends: params.friendId } },
        { new: true, runValidators: true }
      ).select('-__v');
      if (!dbUserData) {
        res.status(404).json({ message: 'No friend found with this id!' });
        return;
      }
      res.json(dbUserData);
    } catch (err) {
      res.status(400).json(err);
    }
  }
};

module.exports = userController;