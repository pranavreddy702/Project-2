const router = require('express').Router();
const { findFood } = require('../services/nutrition');

router.get('/', findFood, (req, res) => {
  console.log(res.nutrition);
  res.render('index', {
    food: res.nutrition,
  });
});

module.exports = router;
