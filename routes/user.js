const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
  res.send(req.user); // The entire user is stored in req.user
});

// Get user list once user logs in
router.get('/list', async (req, res) => {
  const list = await User.find({});
  res.send(list);
});

router.get('/:id', async (req, res) => {
  const user = await User.find({ _id: req.params.id });
  res.send(user);
});

// Getting all the customer enquiries (as a user)
router.get('/:id/enquiries', (req, res) => {
  User.findOne({ _id: req.params.id })
    .populate('enquiries')
    .exec((err, user) => {
      if (err) res.send('Error');
      else res.send(user.enquiries);
    });
});

// User login logic
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) res.send('No user exists');
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send(user);
      });
    }
  })(req, res, next);
});

router.post('/register', (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send('User already exists');
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        password: hashedPassword
      });
      await newUser.save();
      res.send('User created');
    }
  });
});

module.exports = router;
