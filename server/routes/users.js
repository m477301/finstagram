const express = require("express");
const router = express.Router()

const { users } = require("../models")

router.get('/', async (req, res) => {
    return res.send(false);
})

router.post('/', async (request, res) => {

    const {email, password} = request.body;

    try {
        await users.create({
            email: email,
            password: password
        });
    } catch(e) {
        return res.json({ error: e});
    }

    return res.json({message: "User has been CREATED"});

})

module.exports = router;