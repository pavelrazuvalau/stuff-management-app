var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var WishSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  stuff: [{
    type: Schema.ObjectId,
    ref: 'Stuff'
  }]
});

mongoose.model('Wish', WishSchema);
