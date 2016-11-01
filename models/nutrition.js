// dependecies
const { ObjectID } = require('mongodb');
const { getDB } = require('../lib/dbConnect.js');

function showFavorites(req, res, next) {

  getDB().then((db) => {
    db.collection('favorites')
      .find({ userId: { $eq: req.session.userId } })
      .toArray((toArrErr, data) => {
        if(toArrErr) return next(toArrErr);
        res.saved = data;
        db.close();
        next();
      });
      return false;
  });
  return false;
}


function saveFavorites(req, res, next) {
  const insertObj = {};

  for(key in req.body) {
    insertObj[key] = req.body[key];
  }

  insertObj.favorites.userId = req.session.userId;
  getDB().then((db) => {

    db.collection('favorites')
      .insert(insertObj.favorites, (insertErr, result) => {
        if (insertErr) return next(insertErr);
        res.saved = result;
        db.close();
        return next();
      });
    return false;
  });
  return false;
};


function deleteFavorites(req, res, next) {
  getDB().then((db) => {

    db.collection('favorites')
    .findAndRemove({ _id: ObjectID(req.params.id) }, (removeErr, doc) => {
      if (removeErr) return next(removeErr);


      res.remove = doc;
      db.close();
      return next();
    });
    return false;
  });
  return false;
}


function editFood(req, res, next) {
  getDB().then((db) => {
    db.collection('favorites')
      .findAndModify({ _id: ObjectID(req.params.id) }, [] /* sort */,
      { $set: req.body.food }, { new: true } /* options */, (updateError, doc) => {
        if (updateError) return next(updateError);


        res.updated = doc;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}


function getFood(req, res, next) {
  getDB().then((db) => {
    db.collection('favorites')
      .findOne({ _id: ObjectID(req.params.id) }, (findErr, food) => {
        if (findErr) return next(findErr);


        res.food = food;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}

module.exports = {
  showFavorites,
  saveFavorites,
  deleteFavorites,
  editFood,
  getFood,
};
