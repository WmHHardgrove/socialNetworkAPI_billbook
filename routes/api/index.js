const router = require('express').Router();
const userRoutes = require('./userRoutes')
const thoughRoutes = require('./thoughtRoutes')

router.use("/user" , userRoutes)
router.use("/thought" , thoughRoutes)

module.exports = router