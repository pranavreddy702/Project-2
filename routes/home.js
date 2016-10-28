const router = require('express').Router();
const { food } = require('../services/nutrition');

router.get('/', (req, res) => {
  console.log(res.nutrition);
  res.render('index', {
    food: res.nutrition,
  });
});

module.exports = router;
