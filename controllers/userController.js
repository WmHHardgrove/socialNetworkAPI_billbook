const { User, Thought } = require('../models')

const userController = {
    createUser(req,res){
        User.create(req.body)
            .then((userData) =>{
                res.json(userData)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    deleteUser(req,res){
        User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user exists' })
          : Thought.findOneAndUpdate(
              { users: req.params.userId },
              { $pull: { users: req.params.userId } },
              { new: true }
            ),
            res.json({ message:"User Deleted." })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
    
    updateUser(req,res){
        User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true })
        .then((userData) => {
          if (!userData) {
            res.status(404).json({ message: "No user with this ID" });
            return;
          }
          res.json(userData);
        })
        .catch((err) => res.status(400).json(err));
    },

    
    findOneUser(req,res){
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with this ID' })
            : res.json(user)
        )
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },


    findAllUsers(req,res){
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    addFriend({ params, body }, res) {
      User.findOneAndUpdate(
        { _id: params.userId },
        { $addToSet: { reactions: body } },
        { new: true }
      )
        .then((userData) => {
          if (!userData) {
            res.status(404).json({ message: "No usder with this id" });
            return;
          }
          res.json(userData);
        })
        .catch((err) => res.json(err));
    },
  
    deleteFriend({ params }, res) {
      UserfindOneAndUpdate(
        { _id: params.userId },
        { $pull: { reactions: { friends: params.friendId } } },
        { new: true }
      )
        .then((UserData) => res.json(UserData))
        .catch((err) => res.json(err));
    },

}

module.exports = userController;