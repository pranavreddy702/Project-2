//makes sure the .env file is being accessed
require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const path = require('path');
const fetch = require('node-fetch');
const app = express();

const bodyParser      = require('body-parser');
const session         = require('express-session');
const cookieParser    = require('cookie-parser');
const methodOverride  = require('method-override');
const SECRET          = 'iliketocode';

// Routing module vairables
const homeRouter = require('./routes/home');
const userRouter = require('./routes/users');
const indexRouter = require('./routes/index');
const authRouter   = require('./routes/auth');

// look in the public folder
app.use(express.static(path.join(__dirname, '/public')));


app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: SECRET
}));

// tell app to use routing modules at assigned url
app.use('/', homeRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/index', indexRouter);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('server up and running on PORT', PORT)
});
