const router = require('express').Router();
const participantRoutes = require('./participantRoutes');
const bookRoutes = require('./bookRoutes');

router.use('/participants', participantRoutes);
router.use('/books', bookRoutes);

module.exports = router;
