'use strict'
const fetch = require('node-fetch');

const APP_URL = 'https://api.nutritionix.com/v1_1/search/'
const APP_ID = process.env.NUTRITION_ID;
const API_KEY = process.env.NUTRITION_KEY;
const userInputItem = ''
const itemFields = `fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat`

function findFood(req, res, next) {
  fetch(`${APP_URL}${userInputItem}?${itemFields}&appId=${APP_ID}&appKey=${API_KEY}`)
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
