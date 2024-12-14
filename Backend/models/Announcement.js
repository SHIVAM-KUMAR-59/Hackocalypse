import mongoose from 'mongoose'

const Announcement = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Announcement', Announcement)
