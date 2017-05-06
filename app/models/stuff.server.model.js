var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var StuffSchema = new Schema({
  stufftype: {
    type: String,
    required: 'Stuff type is required',
    enum: ['Tshirt', 'Cup', 'Pillow', 'Badge', 'Sticker', 'Сase']
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
    required: 'Cost is required'
  }
})

mongoose.model('Stuff', StuffSchema);
