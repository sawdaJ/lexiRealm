import mongoose from 'mongoose';

const childSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  parentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
   
  },
  bookProgress: [
    {
      book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
      },
      progress: {
        type: Number,
        required: true,
      },
    },
  ],
  quizResults: [
    {
      quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
      },
      result: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Child = mongoose.model('Child', childSchema);

export default Child;
