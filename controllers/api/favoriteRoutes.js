const router = require("express").router();
const { User, Favorite } = require("../../models");


// post a post
router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await post.create({
            title: req.body.title,
            post_text: req.body.post_text,
            user_id: req.body.user_id
        })
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});
// delete post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.post_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});