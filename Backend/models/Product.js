import mongoose from 'mongoose'

const Product = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  condition: { type: String, enum: ['New', 'Used'], required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Product', Product)
