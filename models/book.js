const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const bookSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      max: 50,
      min: 3,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
      max: 30,
      min: 3,
    },
    publishedDate: {
      type: Date,
      required: true,
    },
    categories: [{ type: ObjectId, ref: 'category', required: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('book', bookSchema);
