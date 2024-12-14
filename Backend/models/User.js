import mongoose from 'mongoose'

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    enum: ['citizen', 'admin'],
    type: String,
    default: 'citizen',
  },
})

export default mongoose.model('User', User)
