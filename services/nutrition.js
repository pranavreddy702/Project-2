const fetch = require('node-fetch');

const APP_ID = process.env.NUTRITION_ID;
const API_KEY = process.env.NUTRITION_KEY;

function findFood(req, res, next) {
  fetch(`${API_KEY}q=apple&units=imperial&APPID=${APP_ID}`)
  .then(r => r.json())
  .then((result) => {
    res.nutrition = result;
    next();
  })
  .catch((err) => {
    res.err = err;
    next();
  });
}

module.exports = { findFood };
