const router = require('express').Router();
const {
    createUser,
    deleteUser,
    updateUser,
    findOneUser,
    findAllUsers,
    addFriend,
    deleteFriend
} = require('../../controllers/userController')

router.route('/').get(findAllUsers).post(createUser);

router.route('/:userId').get(findOneUser).delete(deleteUser).put(updateUser);

router.route('/:userId/freinds/:friendId').delete(deleteFriend)

router.route('/userId/friends').post(addFriend);

module.exports = router 