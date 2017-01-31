var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var UserSchema = new Schema({
  role: {
    type: String,
    enum: ['Admin', 'Owner', 'User']
  },
  firstName: String,
  lastName: String,
  website: {
    type: String,
    get: function(url) {
      if (!url) {
        return url;
      } else {
        if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
          url = 'http://' + url;
        }
        return url;
      }
    }
  },
  email: {
    type: String,
    index: true,
    required: true,
    match: /.+\@.+\..+/
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    validate: [
      function(username) {
        return username.length > 3;
      },
      'Username should be longer'
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

UserSchema.set('toJSON', { getters: true });

UserSchema.post('save', function(next) {
  if(this.isNew) {
    console.log('A new user was created.');
  } else {
    console.log('A user updated is details.');
  }
});

mongoose.model('User', UserSchema);
