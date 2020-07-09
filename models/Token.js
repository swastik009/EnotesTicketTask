const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a title for review'],
    maxlength: 100,
  },
  taskAssign: {
    type: [String],
    enum: [
      'Swastik Thapaliya',
      'Roshan Shrestha',
      'Hamlet Maharjan',
      'Keshav Bhadel',
    ],
    required: [true, 'Please assign a task to the user'],
  },
  tokens: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('Token', TokenSchema);
