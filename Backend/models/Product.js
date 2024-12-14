import mongoose from 'mongoose'

const Product = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: false },
  description: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  condition: { type: String, enum: ['New', 'Used'], required: true },
  category: { type: String, required: true },
  barterRequirement: { type: String, required: false },
  barterCategory: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Product', Product)
