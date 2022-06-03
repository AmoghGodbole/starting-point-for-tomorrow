require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const path = require('path');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const userRoutes = require('./routes/user');
const googleUserRoutes = require('./routes/googleUser');
const app = express();

mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log('MongoDB Database connected');
  }
);

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'PATCH']
  })
);
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passportConfig')(passport);
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.use('/api/user', userRoutes);

app.get('/api/logout', (req, res) => {
  req.logout((err) => {
    if (err) console.log('Error during logout: ', err);
    else res.send('Logged out');
  });
});

app.get('/api/cookie/delete', (req, res) => {
  res.clearCookie('currentUser');
  res.send('Cookie cleared');
});

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    res.cookie('currentUser', req.user._id);
    res.redirect('/surveys');
  }
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
