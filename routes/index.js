// set up dependencies
const router = require('express').Router();
const { authenticate } = require('../lib/auth');
const { searchFood } = require('../services/nutrition');
const { saveFavorites, showFavorites, deleteFavorites, editFood, getFood } = require('../models/favorites');
const methodOverride = require('method-override');

// middleware for method override
router.use(methodOverride('_method'));

// middleware to call below functions when on index page and rendering to index page
router.get('/', authenticate, showFavorites, (req, res) => {
  res.render('index', {
    user: res.user,
    showTheFood: [],
    showTheFavorites: res.saved || [],
  });
});

// middleware to call below functions when on city page and rendering to city page
router.get('/food', authenticate, searchFood, showFavorites, (req, res) => {
  res.render('food', {
    user: res.user,
    showTheFood: res.food || [],
    showTheFavorites: res.saved || [],
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


router.post('/food', saveFavorites, (req, res) => {
  res.redirect('/food');
});

module.exports = router;
