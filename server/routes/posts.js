const express = require("express")
const router = express.Router();
const {validateToken} =  require("../middlewares/Authentication")
const { posts, users } = require("../models")
const { Op } = require('sequelize');


router.get("/", validateToken, async (req, res) => {

  let allPosts = await posts.findAll({
    where: {
      status: {
        [Op.not]: "deleted"
      }
    },
    include: [{
      model: users,
      attributes: ["username"]
    }]
  })

  console.log("AllPPP", allPosts)

  return res.json(allPosts)
})

router.post("/", validateToken, async (req, res) => {
    const {title, description} = req.body;

    await posts.create({
      title: title,
      description: description,
      userId: req.user.id,
      status: "active" 
    })

    return res.json({ message: "Post has been CREATED"})
})

router.delete("/:id", validateToken, async (req, res) => {

  const {id} = req.params;

  console.log("__________ID_________", id, Number(id))

  try {
    await posts.update(
      {
        status: "deleted"
      },
      {
        where: {
          id: id
        }
      }
    )
  } catch(e) {
    return res.json({error: e})
  }
  
  return res.json({ message: "Deleted Post"})

})

module.exports = router