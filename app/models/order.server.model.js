var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var OrderSchema = new Schema({
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
    type: Number
  },
  ordered: {
    type: Date,
    default: Date.now
  },
  comment: {
    type: String,
    validate: [
      function(comment) {
        return comment.length <= 255;
      },
      'Comment is too long'
    ]
  },
  status: {
    type: String,
    enum: ['Awaiting payment', 'Processing', 'Finished', 'Canceled'],
    default: 'Awaiting payment'
  }
})

mongoose.model('Order', OrderSchema);
