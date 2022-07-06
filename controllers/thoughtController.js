const { Thought, User } = require("../models");

const thoughtController = {
  createThought(req, res) {
    Thought.create(req.body)
      .then((data) => {
        return User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thought: data._id }},
        { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message : "Thought created, no user with ID"
          })
          : res.json('Created the thought')
      )
      .catch((err) =>{
        console.log(err);
        res.status(500).json(err);
      })
  },

  deleteThought(req,res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((ThoughtData) => {
        if (!ThoughtData) {
          res.status(404).json({ message: "No thought with this ID" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },


  updateThought(req,res) {
    Thought.findOneAndUpdate({ _id: req.params.id }, body, { new: true })
      .then((ThoughtData) => {
        if (!ThoughtData) {
          res.status(404).json({ message: "No thought with this ID" });
          return;
        }
        res.json(ThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },


  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true }
    )
      .then((ThoughtData) => {
        if (!ThoughtData) {
          res.status(404).json({ message: "No thought with this id" });
          return;
        }
        res.json(ThoughtData);
      })
      .catch((err) => res.json(err));
  },

  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { _id: params.reactionId } } },
      { new: true }
    )
      .then((ThoughtData) => res.json(ThoughtData))
      .catch((err) => res.json(err));
  },

    getAllThoughts(req, res) {
      Thought.find()
          .then((users) => res.json(users))
          .catch((err) => res.status(500).json(err));
  },
  
  
    getThoughtById({ params }, res) {
      Thought.findOne({ _id: params.id })
        .then((ThoughtData) => {
          if (!ThoughtData) {
            res.status(404).json({ message: "No thought with this ID" });
            return;
          }
          res.json(ThoughtData);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    },

};

module.exports = thoughtController;