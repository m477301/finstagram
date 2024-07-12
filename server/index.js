const express = require("express");
const app = express()

require('dotenv').config()

app.use(express.json())

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.listen(5555, () => {
    console.log("Server running on PORT 5555")
})