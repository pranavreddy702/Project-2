const express = require('express');
const logger = require('morgan');

const app = app();
const PORT = process.env.PORT || 3000;

app.use(logger('dev'));

app.set('view engine', 'ejs');



app.listen(PORT, () => {
  console.log('server up and running on PORT', PORT)
});
