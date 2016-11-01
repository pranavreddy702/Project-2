// set up dependencies
const router = require('express').Router();
const { authenticate } = require('../lib/auth');
const { findFood } = require('../services/nutrition');
const { saveFavorites, showFavorites, deleteFavorites, editFood, getFood } = require('../models/nutrition');
const methodOverride = require('method-override');

// middleware for method override
router.use(methodOverride('_method'));


router.get('/', authenticate, showFavorites, (req, res) => {
  res.render('index', {
    user: res.user,
    showTheFood: [],
    showTheFavorites: res.saved || [],
  });
});


router.get('/food', authenticate, findFood, (req, res) => {
  res.render('food', {
    user: res.user,
    showTheFood: res.food || [],
    showTheFavorites: res.saved || [],
    food: res.nutrition || [],
  });
});

router.get('/edit/:id', getFood, (req, res) => {
  res.render('edit', { food: res.food });
});

router.put('/edit/:id', editFood, (req, res) => {
  res.redirect('/food');
});


router.delete('/food/:id', deleteFavorites, (req, res) => {
  res.redirect('/food');
});


// router.post('/food', saveFavorites, (req, res) => {
//   res.redirect('/food');
// });



module.exports = router;
