const router = require('express').Router();
const {
    createUser,
    deleteUser,
    updateUser,
    findOneUser,
    findAllUsers
} = require('../../controllers/userController')

router.route('/').get(findAllUsers).post(createUser);

module.exports = router