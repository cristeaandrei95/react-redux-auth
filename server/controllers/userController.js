var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var User = require('../models/User');
var _ = require('lodash');

function generateToken(user) {
  var payload = {
    iss: 'http://app.billpro.ro',
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(7, 'days').unix()
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET);
}
/**
 * Auth middleware 
 */
exports.authenticate = function(req, res, next){
 var token = req.body.token;
 User.findByToken(token).then((user) => {
  if(!user){
   return Promise.reject();
  }
  req.user = user;
  req.token = token;
  next(); 
 }).catch((e) => {
  res.status(401).send({ msg: 'Unauthorized' });
 })
};


/**
 * POST / create new user
 */
exports.signup = function(req, res, next){
 var body = _.pick(req.body, ['name','email','password']);
 var user = new User(body);
 user.save().then(() => {
  return user.generateAuthToken();
 }).then((token) => {
  res.send({ token: token, user: user.toJSON() });
 }).catch((e) => {
  res.status(400).send(e);
 })
} 

/**
 * GET / get user from token 
 */
exports.getUser = function(req, res, next){
 res.send(req.user);
}

exports.login = function(req, res, next){
 var body = _.pick(req.body, ['email','password'])
 User.findByCredentials(body.email, body.password).then((user) => {
  return user.generateAuthToken().then((token) => {
  res.send({ token: token, user: user.toJSON() });
 }) 
 }).catch((e) => {
  res.status(401).send();
 }) 
}

/**
 * POST /signup
 */
exports.signupPost = function(req, res, next) {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  User.findOne({ email: req.body.email }, function(err, user) {
    if (user) {
    return res.status(400).send({ msg: 'The email address you have entered is already associated with another account.' });
    }
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    user.save(function(err) {
    res.send({ token: generateToken(user), user: user });
    });
  });
};


