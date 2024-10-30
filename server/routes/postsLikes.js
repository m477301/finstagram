const express = require("express");
const { validateToken } = require("../middlewares/Authentication");
const router = express.Router();
const { postsLikes } = require("../models")

router.post("/", validateToken, async (req, res) => {
    const {like, postId} = req.body;

    let postLiked = await postsLikes.findOne({
        where: {
            userId: req.user.id,
            postId: postId
        }
    })

    let likedPost;
    if(postLiked) {
        // update
        likedPost = await postsLikes.update({
            like: like
        }, {
            where: {
                userId: req.user.id,
                postId: postId,
                id: postLiked.id
            }
        })
    } else {
        // create
        likedPost = await postsLikes.create({
            like: like,
            userId: req.user.id,
            postId: postId
        })
    }

    return res.json(likedPost)
})

module.exports = router