const express = require('express');
const { createUser }    = require('../models/user.js');
const userRouter = express.Router();

userRouter.post('/', createUser, (req, res) => {
  res.redirect('login')
})

module.exports = userRouter;
