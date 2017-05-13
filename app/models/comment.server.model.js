var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var CommentSchema = new Schema({
  stuff: {
    type: Schema.ObjectId,
    ref: 'Stuff'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  message: {
    type: String,
    validate: [
      function(comment) {
        return comment.length <= 255;
      },
      'Message is too long'
    ]
  },
  rating: {
    type: Number,
    validate: [
      function(rating) {
        return rating >= 1 && rating <= 5;
      },
      'Rating should be from 1 to 5'
    ]
  },
  date: {
    type: Date,
    default: Date.now
  }
})

CommentSchema.post('save', function(next) {
  this.model('Stuff').findByIdAndUpdate({
    _id: this.stuff._id
  }, {
    $addToSet: {
      comments: this
    },
  }, {upsert: true}, function (err) {
    if (err){
      // res.status(400).send({message: 'Comment save error'})
      console.log('error');
    }
  });
});

// CommentSchema.pre('remove', function(next) {
//   this.model('Stuff').findByIdAndUpdate({
//     _id: this.stuff._id
//   }, {
//     $pull: {
//       comments: this
//     },
//   }, next);
// });

mongoose.model('Comment', CommentSchema);
