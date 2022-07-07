const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const parkRoutes = require('./parkRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const withAuth = require('../utils/auth')

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/park', parkRoutes);
router.use('/dashboard', withAuth, dashboardRoutes);


module.exports = router;
