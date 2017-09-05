const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
  email: { 
   type: String,
   required: true,
   trim: true,
   minlength: 6,
   unique: true,
   validate: {
    validator: validator.isEmail,
    message: '{VALUE} is not a valid email'
   } 
  },
  name: {
   type: String,
   required: true
  },
  password: { 
   type: String,
   required: true,
   trim: true,
   minlength: 6 
  },
  tokens: [{
   access: {
    type: String,
    required: true
  },
  token: {
   type: String,
   required: true
  }
 }]
});


UserSchema.pre('save', function(next) {
 var user = this;

 if (user.isModified('password')) {
  bcrypt.genSalt(10, (err, salt) => {
   bcrypt.hash(user.password, salt, (err, hash) => {
    user.password = hash;
    next();
   });
  })
 } else {
  next();
 } 
})
 

UserSchema.methods.toJSON = function () {
 var user = this;
 var userObject = user.toObject();

 return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function () {
 var user = this;
 var access = 'auth';
 var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.TOKEN_SECRET).toString();

 user.tokens.push({access, token});

 return user.save().then(() => {
  return token;
 })
};

UserSchema.statics.findByToken = function (token) {
 var User = this;
 var decoded;

 try{
  decoded = jwt.verify(token, process.env.TOKEN_SECRET); 
 } catch (e) {
  return Promise.reject();
 }
 return User.findOne({
  '_id': decoded._id,
  'tokens.token': token,
  'tokens.access': 'auth'
 })
}

UserSchema.statics.findByCredentials = function(email, password){
 var User = this;
 
 return User.findOne({email}).then((user) => {
  if (!user) {
   return Promise.reject(); 
  }
  
  return new Promise((resolve, reject) => {
   bcrypt.compare(password, user.password, (err, res) => {
    if (res) {
     resolve(user);
    } else {
     reject();
    }
   })   
  })
 })
}

UserSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    cb(err, isMatch);
  });
};

var User = mongoose.model('User', UserSchema);

module.exports = User;