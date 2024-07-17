const express = require("express");
const bcrypt = require("bcrypt");
const { users } = require("../models");
const Validation = require("../helpers/Validation");

const router = express.Router();

router.get('/', async (_, res) => {
    return res.send(false);
})

router.post('/', async (request, res) => {

    const {email, password} = request.body;

    if(!Validation.isValidEmail(email)){
        return res.json({ error: "Invalid Email"});
    };

    if(!Validation.isValidPassword(password)) {
        return res.json({ error: "Invalid Password"});
    }

    try {
        bcrypt.hash(password, 10).then(async (hash) => {
            await users.create({
                email: email,
                password: hash,
            });
            return res.json({message: "User has been CREATED"});
        })

    } catch(e) {
        return res.json({ error: e});
    }
})

module.exports = router;