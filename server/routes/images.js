const express = require('express')
const router = express.Router()

const {validateToken} = require("../middlewares/Authentication")
const {upload, getImage} = require("../services/S3Manager")

router.post('/upload', [validateToken, upload.single("file")] , async (req, res) => {

    const {file} = req;

    console.log("File", file)

    return res.json(file)
})

router.post('/postImage', validateToken, async (req, res) => {
    const { key } = req.body;

    return await getImage(key, res);
})

module.exports = router;