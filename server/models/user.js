import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    required: true
  },

  subscriptionStatus: {
    type: String,
    default: 'free'
  },

  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child',
  }],
  
  isAdmin: {
    type: Boolean,
    default: false
  },
  messages: [{
    type: String,
    default: ''
  }]
});

const User = mongoose.model('User', userSchema);

export default User;