const router = require('express').Router();

router.get('/login', (req, res) => {
  res.render('index');
});

module.exports = router;
