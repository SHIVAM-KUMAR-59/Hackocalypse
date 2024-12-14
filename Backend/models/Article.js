import mongoose from 'mongoose'

const Article = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    maxLength: 100,
    minLength: 3,
  },
  desc: { type: String, required: true, minLength: 7, maxLength: 100 },
  content: { type: String, required: true, minLength: 10 },
  imageUrl: { type: String, required: false },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  publishedAt: { type: Date, default: Date.now },
})

export default mongoose.model('Article', Article)
