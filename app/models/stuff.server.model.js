var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var StuffSchema = new Schema({
  stufftype: {
    type: String,
    required: 'Stuff type is required',
    enum: ['T-shirt', 'Cup', 'Badge', 'Sticker', 'Сase']
  },
  name: {
    type: String,
    required: 'Name is required',
    validate: [
      function(name) {
        return name.length >= 5 && name.length <= 50;
      },
      'Name length is not valid'
    ]
  },
  image: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    validate: [
      function(description) {
        return description.length <= 255;
      },
      'Description is too long'
    ]
  },
  cost: {
    type: Number,
    required: 'Cost is required',
    validate: [
      function(cost) {
        console.log(cost);
        return cost > 0;
      },
      'Cost is negative'
    ]
  },
  comments: [{
    type: Schema.ObjectId,
    ref: 'Comment'
  }]
})

StuffSchema.pre('remove', function(next) {
  this.model('Order').update({}, {
    $pull: {
      stuff: {
        item: this._id
      }
    },
  }, {"multi": true}, next);
  this.model('Cart').update({}, {
    $pull: {
      stuff: {
        item: this._id
      }
    },
  }, {"multi": true}, next);
  this.model('Wish').update({}, {
    $pull: {
      stuff: {
        item: this._id
      }
    },
  }, {"multi": true}, next);
});

mongoose.model('Stuff', StuffSchema);
