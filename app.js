require('dotenv').config();

const express = require('express');
const logger = require('morgan');

const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000

const homeRouter = require('./routes/home');

app.use(logger('dev'));
app.use('/', homeRouter);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.listen(PORT, () => {
  console.log('server up and running on PORT', PORT)
});
