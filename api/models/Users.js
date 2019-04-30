var mongoose = require('mongoose');

var User = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
}, {timestamps: true},{
  collection: 'users'
});

module.exports = mongoose.model('User', User);
