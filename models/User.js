const mongoose = require('mongoose');
const { Schema } = mongoose;

const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 6
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email.'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: { type: String, required: true },
    token:  { type: String, required: true }
  }],
  createdAt: { type: Date, default: Date.now }
});

UserSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = async function() {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();

  user.tokens = user.tokens.concat({ access, token })

  await user.save();

  return token;
};

UserSchema.statics.findByToken = async function(token) {
  const User = this;
  let decoded = jwt.verify(token, 'abc123');

  return await User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

mongoose.model('User', UserSchema);
