const express = require('express');
const { createUser }    = require('../models/user.js');
const { authenticate } = require('../lib/auth');
const { findFood } = require('../services/nutrition');
const usersRouter = express.Router();

usersRouter.post('/', createUser, (req, res) => {
  res.redirect('/')
});

usersRouter.get('/profile', authenticate, (req, res) => {
  res.render('users/profile', { user: res.user });
});

usersRouter.get('/food', findFood, (req,res) =>   {
  res.render('users/food')
});

module.exports = usersRouter;


