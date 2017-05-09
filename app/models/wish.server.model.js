var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var WishSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    unique: true
  },
  stuff: [{
    type: Schema.ObjectId,
    ref: 'Stuff',
    unique: true
  }]
});

mongoose.model('Wish', WishSchema);
