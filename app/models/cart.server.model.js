var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var CartSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  stuff: [{
    item: {
      type: Schema.ObjectId,
      ref: 'Stuff'
    },
    count: {
      type: Number,
      default: 1
    }
  }]
});

mongoose.model('Cart', CartSchema);
