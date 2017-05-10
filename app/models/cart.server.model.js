var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose);

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
  }],
  sum: {
    type: Float,
    default: 0.00
  }
});

mongoose.model('Cart', CartSchema);