const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
      res.redirect('/index');
      return;
  }
  res.render('login');
});

// Route to view search results
router.post("/", async (req, res) => {
  try {
    console.log("POST " + req.body);

    // Serializes data
    const results = JSON.parse(JSON.stringify(...req.body));

    // Renders parks to homepage
    res.render("index", results);
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
