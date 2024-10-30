const express = require("express");
const server = express()
const cors = require('cors');

const db = require('./models');

require('dotenv').config();

server.use(express.json())
server.use(cors());

const usersRouter = require('./routes/users');
server.use('/users', usersRouter);
const postsRouter = require('./routes/posts')
server.use('/posts', postsRouter)
const postsLikesRouter = require('./routes/postsLikes')
server.use('/postsLikes', postsLikesRouter)
const imagesRouter = require('./routes/images');
server.use('/images', imagesRouter)

db.sequelize.sync().then(() => {
    server.listen(5555, () => {
        console.log("Server running on PORT 5555")
    })
})