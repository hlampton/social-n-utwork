const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// GET all thoughts
router.get('/', getAllThoughts);

// POST a new thought by user id
router.post('/:userId', addThought);

// GET a thought by thought id
// PUT (update) a thought by thought id
// DELETE a thought by thought id
router.route('/:thoughtId')
    .get(getThoughtById)
    .put(addThought)
    .delete(removeThought);

// POST a reaction to a thought by thought id
// DELETE a reaction to a thought by thought id
router.route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction);

module.exports = router;
