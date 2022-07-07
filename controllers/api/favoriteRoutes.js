const router = require("express").router();
const { Favorite } = require("../../models");


// post a favorite
router.post('/', withAuth, async (req, res) => {
    try {
        const favoriteData = await Favorite.create({
            park_code: req.body.parkCode,
            user_id: req.session.user_id
        })
        res.status(200).json(favoriteData);
    } catch (err) {
        res.status(400).json(err);
    }
});
// remove a favorite
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const favoriteData = await Favorite.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!favoriteData) {
      res.status(404).json({ message: "No favorite found with this id!" });
      return;
    }

    res.status(200).json(favoriteData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;