import mongoose from 'mongoose'

const Product = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: false },
  description: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  condition: { type: String, enum: ['New', 'Used'], required: true },
  category: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  barterRequirement: { type: String, required: false },
  barterCategory: { type: String, required: false },
  barterQuantity: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Product', Product)
