import mongoose from 'mongoose';

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  readingLevel: {
    type: String,
    enum: ['0-3', '4-6', '7-12'],
    required: true
  },
  pages: [{
    image: {
      type: String,
      required: true
    },
    text: {
      type: String,
      default: 'null'
    },
  }],
  quiz: [{
    questions: [{
      question: {
        type: String,
        required: true,
      },
      options: {
        type: [String],
        required: true,
        validate: [arrayLimit, 'Options should contain exactly 4 elements'],
      },
      correctOption: {
        type: Number,
        required: true,
        min: 0,
        max: 3,
      },
    }],
  }]
});

function arrayLimit(val) {
  return val.length === 4;
}


const Book = mongoose.model('Book', bookSchema);

export default Book;
