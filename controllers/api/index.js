const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes.js')

router.use('/users', userRoutes);
router.use('/posts', userRoutes);

module.exports = router;