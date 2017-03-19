var mongoose = require('mongoose'),
    crypto   = require('crypto'),
    Schema   = mongoose.Schema;

var UserSchema = new Schema({
  role: {
    type: String,
    enum: ['Admin', 'Moderator', 'User'],
    default: 'User'
  },
  firstName: {
    type: String,
    required: 'First Name is required',
    validate: [
      function(username) {
        return username.length >= 3;
      },
      'First Name is too short'
    ]
  },
  lastName: {
    type: String,
    required: 'Last Name is required',
    validate: [
      function(username) {
        return username.length >= 3;
      },
      'Last Name is too short'
    ]
  },
  email: {
    type: String,
    index: true,
    required: 'E-mail is required',
    match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    required: 'Username is required',
    validate: [
      function(username) {
        return username.length > 3;
      },
      'Username is too short'
    ]
  },
  password:  {
    type: String,
    required: true,
    validate: [
      function(password) {
        return password.length >= 6;
      },
      'Password should be longer'
    ]
  },
  salt: {
    type: String
  },
  provider: {
    type: String,
    required: 'Provider is required'
  },
  providerId: String,
  providerData: {},
  created: {
    type: Date,
    default: Date.now
  }
});

UserSchema.virtual('fullName')
  .get(function() {
    return this.firstName + ' ' + this.lastName;
  })
  .set(function(fullName) {
    var splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
  });

UserSchema.pre('save', function(next) {
  if (this.password) {
    this.salt = new
    Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }
  next();
});

UserSchema.methods.hashPassword = function(password) {
  return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha1').toString('base64');
};

UserSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
  var possibleUsername = username + (suffix || '');

  this.findOne({
    username: possibleUsername
  }, function(err, user) {
    if (!err) {
      if (!user) {
        callback(possibleUsername);
      } else {
        return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
  });
};

UserSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

mongoose.model('User', UserSchema);
