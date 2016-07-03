const mongoose = require('../lib/db.js');
const
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  createdAt: Date,
  updatedAt: Date,
  email: String
});

userSchema.plugin(require('mongoose-bcrypt'));

userSchema.methods.updateEmail = function(newEmail) {
  this.email = newEmail;
  this.save();
}

{ // BLOCK for user create 
  return User.create({
    username: req.username,
    password: req.password,
    createdAt: Time.now();
    updatedAt: Time.now();
    email: req.email
  }, function(err, user) {
    if(!err) {
      user.verifyPassword(req.password, function(err, valid) {
        if (!err) {
          // ...create user
        }
      });
    }
  });

};


const User = mongoose.model('User', userSchema);

module.exports = User;
